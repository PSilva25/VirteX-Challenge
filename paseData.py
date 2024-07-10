import re
import json

def parse_huawei(file_path):
    with open(file_path, 'r') as file:
        data = file.readlines()
    
    result = []
    for line in data:
        match = re.match(r'(\d+)/(\d+)/(\d+)\s+(\w+)\s+(\w+)\s+(\w+)', line)
        if match:
            slot, port, ont_id, sn, status = match.groups()
            result.append({
                "slot": slot,
                "port": port,
                "ont_id": ont_id,
                "sn": sn,
                "state": status
            })
    return result

def parse_zte_sns(file_path):
    with open(file_path, 'r') as file:
        data = file.readlines()
    
    result = []
    for line in data:
        match = re.match(r'gpon-onu_(\d+)/(\d+)/(\d+):(\d+)\s+\w+\s+\w+\s+SN:(\w+)\s+(\w+)', line)
        if match:
            slot, port, ont_id, sn, status = match.groups()
            result.append({
                "slot": slot,
                "port": port,
                "ont_id": ont_id,
                "sn": sn,
                "state": status
            })
    return result

def parse_zte_state(file_path):
    with open(file_path, 'r') as file:
        data = file.readlines()
    
    result = []
    for line in data:
        match = re.match(r'(\d+)/(\d+)/(\d+):(\d+)\s+\w+\s+\w+\s+(\w+)\s+\w+', line)
        if match:
            slot, port, ont_id, status = match.groups()
            result.append({
                "slot": slot,
                "port": port,
                "ont_id": ont_id,
                "state": status
            })
    return result

huawei_data = parse_huawei('OntInfo - Huawei.txt')
zte_sns_data = parse_zte_sns('OntInfo - ZTE - SNs.txt')
zte_state_data = parse_zte_state('OntInfo - ZTE - SNs - State.txt')

# Salvando os resultados em JSON
with open('huawei_data.json', 'w') as f:
    json.dump(huawei_data, f, indent=4)

with open('zte_sns_data.json', 'w') as f:
    json.dump(zte_sns_data, f, indent=4)

with open('zte_state_data.json', 'w') as f:
    json.dump(zte_state_data, f, indent=4)
