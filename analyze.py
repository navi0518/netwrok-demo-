# import socket
# import struct

# def capture_traffic(timeout=10):
#     # Create a raw socket to capture packets
#     try:
#         s = socket.socket(socket.AF_PACKET, socket.SOCK_RAW, socket.ntohs(0x0003))
#     except socket.error as e:
#         return {'error': f"Socket creation failed: {e}"}

#     # Capture packets for the specified timeout
#     s.settimeout(timeout)

#     captured_packets = []

#     try:
#         while True:
#             packet = s.recvfrom(65565)[0]
#             captured_packets.append(packet)
#     except socket.timeout:
#         pass

#     s.close()

#     return captured_packets

# def analyze_dns_packets(packets):
#     dns_packets = []
#     for packet in packets:
#         # Assuming DNS packets are UDP packets (port 53)
#         if struct.unpack('!H', packet[20:22])[0] == 53:
#             dns_packets.append(packet)

#     return dns_packets

# # Example usage:
# captured_packets = capture_traffic(timeout=10)
# dns_packets = analyze_dns_packets(captured_packets)

# print(f"Captured {len(dns_packets)} DNS packets:")
# for i, packet in enumerate(dns_packets):
#     print(f"Packet {i+1}: {packet}")
