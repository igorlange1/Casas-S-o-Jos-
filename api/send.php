<?php
define('SECURE_ACCESS', true);
require_once 'config.php';

// Configurações de segurança
define('RATE_LIMIT_SECONDS', 60); // 1 minuto entre envios por IP
define('LOG_FILE', 'error_log.log');
define('RATE_LIMIT_FILE', 'rate_limits.json');

// Função para logar erros com segurança
function log_error($message) {
    $timestamp = date('Y-m-d H:i:s');
    $log_entry = "[$timestamp] $message" . PHP_EOL;
    file_put_contents(LOG_FILE, $log_entry, FILE_APPEND);
}

// 1. Apenas permite requisições POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('HTTP/1.1 405 Method Not Allowed');
    echo json_encode(['error' => 'Método não permitido']);
    exit;
}

// 2. Recebe e decodifica o JSON do front-end
$json = file_get_contents('php://input');
$data = json_decode($json, true);

if (!$data) {
    header('HTTP/1.1 400 Bad Request');
    echo json_encode(['error' => 'Dados inválidos']);
    exit;
}

// 3. Proteção contra Spam (Honeypot)
if (!empty($data['website_verification'])) {
    // Bot preencheu o campo oculto. Ignorar silenciosamente ou retornar sucesso falso.
    log_error("Spam detectado via Honeypot do IP: " . $_SERVER['REMOTE_ADDR']);
    echo json_encode(['success' => true, 'message' => 'Recebido!']); // Retorna sucesso para o bot não saber que foi bloqueado
    exit;
}

// 4. Rate Limiting Básico por IP
$user_ip = $_SERVER['REMOTE_ADDR'];
$now = time();
$rate_limits = [];

if (file_exists(RATE_LIMIT_FILE)) {
    $rate_limits = json_decode(file_get_contents(RATE_LIMIT_FILE), true) ?: [];
}

// Limpar registros antigos (maiores que 1 hora) para manter o arquivo pequeno
$rate_limits = array_filter($rate_limits, function($timestamp) use ($now) {
    return ($now - $timestamp) < 3600;
});

if (isset($rate_limits[$user_ip]) && ($now - $rate_limits[$user_ip]) < RATE_LIMIT_SECONDS) {
    header('HTTP/1.1 429 Too Many Requests');
    echo json_encode(['error' => 'Muitos envios rápidos. Por favor, aguarde um momento.']);
    exit;
}

// 5. Validação de campos obrigatórios
$nome = isset($data['nome']) ? trim(strip_tags($data['nome'])) : '';
$telefone = isset($data['telefone']) ? trim(strip_tags($data['telefone'])) : (isset($data['whatsapp']) ? trim(strip_tags($data['whatsapp'])) : '');

if (empty($nome) || empty($telefone)) {
    header('HTTP/1.1 400 Bad Request');
    echo json_encode(['error' => 'Nome e Telefone são obrigatórios']);
    exit;
}

// Sanitização adicional
$cidade = isset($data['cidade']) ? trim(strip_tags($data['cidade'])) : 'Não informado';
$interesse = isset($data['interesse']) ? trim(strip_tags($data['interesse'])) : 'Geral';
$descricao = isset($data['descricao']) ? trim(strip_tags($data['descricao'])) : 'Sem mensagem';

// Limitar tamanho para evitar abuso
$nome = mb_substr($nome, 0, 100);
$telefone = mb_substr($telefone, 0, 30);
$cidade = mb_substr($cidade, 0, 100);
$interesse = mb_substr($interesse, 0, 100);
$descricao = mb_substr($descricao, 0, 1000);

// 6. Formata a mensagem para o Make.com / WA Speed
$payload = [
    'source' => 'Site Casas São José',
    'customer_name' => $nome,
    'customer_phone' => $telefone,
    'city' => $cidade,
    'interest' => $interesse,
    'message' => $descricao,
    'raw_data' => $data, // Enviamos tudo se houver campos extras
    'created_at' => date('Y-m-d H:i:s'),
    'user_ip' => $user_ip
];

// 7. Envia para a outra empresa via cURL
$ch = curl_init(EXTERNAL_WEBHOOK_URL);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
curl_setopt($ch, CURLOPT_TIMEOUT, 10); // Timeout de 10 segundos
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'Authorization: Bearer ' . API_TOKEN
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlError = curl_error($ch);
curl_close($ch);

// 8. Registrar sucesso ou erro e retornar para o site
header('Content-Type: application/json');

if ($httpCode >= 200 && $httpCode < 300) {
    // Atualizar rate limit apenas em caso de sucesso ou se quisermos bloquear falhas repetidas também
    $rate_limits[$user_ip] = $now;
    file_put_contents(RATE_LIMIT_FILE, json_encode($rate_limits));
    
    echo json_encode(['success' => true, 'message' => 'Recebemos sua solicitação. Em breve entraremos em contato.']);
} else {
    log_error("Erro ao enviar para Webhook Externo ($httpCode). Erro cURL: $curlError. Resposta: $response");
    
    // Mesmo em falha externa, retornamos sucesso amigável para o usuário não ficar frustrado, 
    // mas talvez informando que houve um atraso
    echo json_encode(['success' => true, 'message' => 'Recebemos sua solicitação. Em breve entraremos em contato.']);
}
