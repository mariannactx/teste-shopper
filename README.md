# Teste-shopper

## Endpoints

### POST /upload

#### Request body example

```json
{
  "image": "<imagem em base64>",
  "customer_code": "12345",
  "measure_datetime": "2024-08-28T18:21:44.404+03:00",
  "measure_type": "GAS"
}
```

### PATCH /confirm

#### Request body example

```json
{
  "measure_uuid": "47051162-e9fa-42eb-87a4-8023c2ac35af",
  "confirmed_value": 123
}
```

### GET /customer_code/list

#### Examples

http://localhost/12345/
http://localhost/12345/list?measure_type=WATER

### GET /images/measure_uuid

#### Example

http://localhost/images/47051162-e9fa-42eb-87a4-8023c2ac35af
