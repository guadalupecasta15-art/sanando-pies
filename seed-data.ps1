$url = (Get-Content .env.local | Select-String "NEXT_PUBLIC_SUPABASE_URL=(.*)").Matches.Groups[1].Value
$serviceKey = (Get-Content .env.local | Select-String "SUPABASE_SERVICE_ROLE_KEY=(.*)").Matches.Groups[1].Value

$headers = @{
    "apikey" = $serviceKey
    "Authorization" = "Bearer $serviceKey"
    "Content-Type" = "application/json"
    "Prefer" = "return=representation"
}

Write-Host "Creando Consultorio 2..."
$room2 = Invoke-RestMethod -Uri "$url/rest/v1/rooms" -Method POST -Headers $headers -Body '{"name":"Consultorio 2","active":true}'
$room2 | Format-List

Write-Host "Creando servicio: Una encarnada..."
$service1 = Invoke-RestMethod -Uri "$url/rest/v1/services" -Method POST -Headers $headers -Body '{"name":"Una encarnada","slug":"una-encarnada","duration_minutes":45,"price":850,"active":true}'
$service1 | Format-List

Write-Host "Creando servicio: Valoracion podologica..."
$service2 = Invoke-RestMethod -Uri "$url/rest/v1/services" -Method POST -Headers $headers -Body '{"name":"Valoracion podologica","slug":"valoracion-podologica","duration_minutes":30,"price":500,"active":true}'
$service2 | Format-List

Write-Host "Creando paciente: Ana Martinez..."
$patient1 = Invoke-RestMethod -Uri "$url/rest/v1/patients" -Method POST -Headers $headers -Body '{"full_name":"Ana Martinez","phone":"33 1122 3344","email":"ana.martinez@correo.com","birth_date":"1990-04-12"}'
$patient1 | Format-List

Write-Host "TODO LISTO. Guarda estos IDs:"
Write-Host "room2 id: $($room2.id)"
Write-Host "service1 id: $($service1.id)"
Write-Host "service2 id: $($service2.id)"
Write-Host "patient1 id: $($patient1.id)"