#include <WiFiNINA.h>

#define sensorPin A5

char ssid[] = "me-iphone";
char pass[] = "abcabc123";

int status = WL_IDLE_STATUS;

char server[] = "https://wifi-connected-thermometer-gui.herokuapp.com";

String postData;
String postVariable = "temp=";

WiFiClient client;

void setup() {

  Serial.begin(9600);

  while (status != WL_CONNECTED) {
    Serial.print("Attempting to connect to Network named: ");
    Serial.println(ssid);
    status = WiFi.begin(ssid, pass);
    delay(10000);
  }

  Serial.print("SSID: ");
  Serial.println(WiFi.SSID());
  IPAddress ip = WiFi.localIP();
  IPAddress gateway = WiFi.gatewayIP();
  Serial.print("IP Address: ");
  Serial.println(ip);
}

void loop() {
  int reading = analogRead(sensorPin);
  float voltage = reading * 5.0;
  voltage /= 1024.0;
  float temperatureC = (voltage - 0.5) * 100 ;
  float temperatureF = (temperatureC * 9.0 / 5.0) + 32.0;

  postData = postVariable + temperatureF;

  if (client.connect(server, 80)) {
    client.println("POST /api/temperature HTTP/1.1");
    client.println("Host: https://wifi-connected-thermometer-gui.herokuapp.com");
    client.println("Content-Type: application/x-www-form-urlencoded");
    client.print("Content-Length: ");
    client.println(postData.length());
    client.println();
    client.print(postData);
  }

  if (client.connected()) {
    client.stop();
  }
  Serial.println(postData);

  delay(1000);
}