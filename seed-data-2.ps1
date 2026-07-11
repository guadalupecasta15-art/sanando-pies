$url = (Get-Content .env.local | Select-String "NEXT_PUBLIC_SUPABASE_URL=(.*)").Matches.Groups[1].Value
$serviceKey = (Get-Content .env.local | Select-String "SUPABASE_SERVICE_ROLE_KEY=(.*)").Matches.Groups[1].Value

$headers = @{
    "apikey" = $serviceKey
    "Authorization" = "Bearer $serviceKey"
    "Content-Type" = "application/json"
    "Prefer" = "return=representation"
}

$today = Get-Date -Format "yyyy-MM-dd"

Write-Host "Creando cita para hoy..."
$appointmentBody = @{
    patient_id = "c996653c-9735-41cd-b040-105bebcb6d69"
    specialist_id = "db21af34-d222-4120-9e90-2b6e11454d70"
    service_id = "96b92f1b-729a-453b-963b-fea356711be8"
    room_id = "935a69d1-3cdd-4130-897b-787943551f22"
    appointment_date = $today
    start_time = "09:00"
    end_time = "09:45"
    status = "confirmada"
} | ConvertTo-Json

$appointment = Invoke-RestMethod -Uri "$url/rest/v1/appointments" -Method POST -Headers $headers -Body $appointmentBody
$appointment | Format-List

Write-Host "Creando una venta de hoy..."
$saleBody = @{
    patient_id = "c996653c-9735-41cd-b040-105bebcb6d69"
    total = 850
    payment_method = "efectivo"
} | ConvertTo-Json

$sale = Invoke-RestMethod -Uri "$url/rest/v1/sales" -Method POST -Headers $headers -Body $saleBody
$sale | Format-List

Write-Host "LISTO."