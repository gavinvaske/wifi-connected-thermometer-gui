#include <WiFi.h>
#include <HTTPClient.h>
 
const char* ssid = "me-iphone";
const char* password =  "abcabc123";
String postData;
String postVariable = "temp=";
 
void setup() {
 
  Serial.begin(115200);
  delay(4000);   //Delay needed before calling the WiFi.begin
 
  WiFi.begin(ssid, password); 
 
  while (WiFi.status() != WL_CONNECTED) { //Check for the connection
    delay(1000);
    Serial.println("Connecting to WiFi..");
  }
 
  Serial.println("Connected to the WiFi network");

}
 
void loop() {
 
 if(WiFi.status()== WL_CONNECTED){   //Check WiFi connection status
 
   HTTPClient http;
 
   http.begin("https://wifi-connected-thermometer-gui.herokuapp.com/api/temperature");  //Specify destination for HTTP request
   http.addHeader("Content-Type", "application/x-www-form-urlencoded");             //Specify content-type header
    // http.addHeader("Content-Type", "text/plain");             //Specify content-type header
    float temperature = 25.0;
   int httpResponseCode = http.POST("temp=" + temperature);   //Send the actual POST request
 
   if(httpResponseCode>0){
 
    String response = http.getString();                       //Get the response to the request
 
    Serial.println(httpResponseCode);   //Print return code
    Serial.println(response);           //Print request answer
 
   }else{
 
    Serial.print("Error on sending POST: ");
    Serial.println(httpResponseCode);
 
   }
 
   http.end();  //Free resources
 
 }else{
 
    Serial.println("Error in WiFi connection");   
 
 }
 
  delay(1000);  //Send a request every 1 seconds
 
}