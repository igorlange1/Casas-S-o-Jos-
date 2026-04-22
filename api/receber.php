<?php
error_reporting(0);
ini_set('display_errors', 0);

// CORS e Cabeçalhos
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('HTTP/1.1 200 OK');
    exit;
}

define('SECURE_ACCESS', true);
require_once 'config.php';

// Configurações de segurança
define('RATE_LIMIT_SECONDS', 60); // 1 minuto entre envios por IP
define('LOG_FILE', 'error_log.log');
define('RATE_LIMIT_FILE', 'rate_limits.json');

// Função para logar erros com segurança
function log_error($message) {
    try {
        $timestamp = date('Y-m-d H:i:s');
        $log_entry = "[$timestamp] $message" . PHP_EOL;
        @file_put_contents(LOG_FILE, $log_entry, FILE_APPEND);
    } catch (Exception $e) {
        // Silencioso se não puder gravar log
    }
}

// 1. Apenas permite requisições POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('HTTP/1.1 405 Method Not Allowed');
    echo json_encode(['error' => 'Método não permitido']);
    exit;
}

// 2. Recebe os dados (suporta JSON ou FormData convencional)
$json = file_get_contents('php://input');
$data = json_decode($json, true);

if (!$data) {
    // Se não for JSON, tenta pegar do POST direto (FormData)
    $data = $_POST;
}

if (!$data || empty($data)) {
    header('Content-Type: application/json', true, 400);
    echo json_encode(['error' => 'Dados vazios ou formato inválido']);
    exit;
}

// 3. Proteção contra Spam (Honeypot)
if (!empty($data['website_verification'])) {
    // Bot preencheu o campo oculto. Ignorar silenciosamente ou retornar sucesso falso.
    log_error("Spam detectado via Honeypot do IP: " . $_SERVER['REMOTE_ADDR']);
    echo json_encode(['success' => true, 'message' => 'Recebido!']); // Retorna sucesso para o bot não saber que foi bloqueado
    exit;
}

// 4. Rate Limiting Básico (Desativado temporariamente para teste de compatibilidade)
$user_ip = $_SERVER['REMOTE_ADDR'];
$now = time();

// 5. Validação de campos obrigatórios
$nome = isset($data['nome']) ? trim(strip_tags($data['nome'])) : '';
$telefone = isset($data['telefone']) ? trim(strip_tags($data['telefone'])) : (isset($data['whatsapp']) ? trim(strip_tags($data['whatsapp'])) : '');

if (empty($nome) || empty($telefone)) {
    header('Content-Type: application/json', true, 400);
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

// Formata a mensagem para o Make.com
$payload = [
    'source' => 'Site Casas São José',
    'customer_name' => $nome,
    'customer_phone' => $telefone,
    'city' => $cidade,
    'interest' => $interesse,
    'message' => $descricao,
    'created_at' => date('Y-m-d H:i:s'),
    'user_ip' => $user_ip
];

// 7. Envia para a outra empresa via cURL
$ch = curl_init(EXTERNAL_WEBHOOK_URL);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
curl_setopt($ch, CURLOPT_TIMEOUT, 10);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); // Importante para compatibilidade em cPanel/Hospedagem compartilhada
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json'
]);
// Se houver um token, adicionamos
if (defined('API_TOKEN') && API_TOKEN !== 'SEU_TOKEN_AQUI') {
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json',
        'Authorization: Bearer ' . API_TOKEN
    ]);
}

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

// 8. Sempre retornar sucesso JSON para o front-end se chegamos aqui
header('Content-Type: application/json');
echo json_encode(['success' => true, 'message' => 'Recebido']);
exit;
