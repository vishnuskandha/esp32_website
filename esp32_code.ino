#include <HTTPClient.h>
#include <WiFi.h>


// ==========================================
// CONFIGURATION
// ==========================================
const char *ssid = "YOUR_WIFI_SSID";
const char *password = "YOUR_WIFI_PASSWORD";

// Replace with your Vercel deployment URL (e.g.,
// https://your-project.vercel.app) For local testing, use your computer's IP
// (e.g., http://192.168.1.100:3000)
const char *serverUrl = "https://esp32-website-kappa.vercel.app/api/button";

// Pin Definitions
const int BUTTON_1_PIN = 4; // GPIO 4
const int BUTTON_2_PIN = 5; // GPIO 5

// ==========================================
// STATE MANAGEMENT
// ==========================================
bool lastButton1State = false;
bool lastButton2State = false;
unsigned long lastDebounceTime = 0;
unsigned long debounceDelay = 50;

void setup() {
  Serial.begin(115200);

  // Initialize Buttons
  pinMode(BUTTON_1_PIN, INPUT_PULLUP); // Assumes button connects to GND
  pinMode(BUTTON_2_PIN, INPUT_PULLUP);

  // Connect to WiFi
  WiFi.begin(ssid, password);
  Serial.println("Connecting to WiFi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("Connected to WiFi network with IP Address: ");
  Serial.println(WiFi.localIP());
}

void loop() {
  // Read Buttons (Inverted logic because of INPUT_PULLUP)
  bool currentButton1State = !digitalRead(BUTTON_1_PIN);
  bool currentButton2State = !digitalRead(BUTTON_2_PIN);

  // Check for change
  if (currentButton1State != lastButton1State ||
      currentButton2State != lastButton2State) {
    // Simple debounce
    if ((millis() - lastDebounceTime) > debounceDelay) {

      Serial.print("Button 1: ");
      Serial.print(currentButton1State);
      Serial.print(" | Button 2: ");
      Serial.println(currentButton2State);

      sendButtonState(currentButton1State, currentButton2State);

      lastButton1State = currentButton1State;
      lastButton2State = currentButton2State;
      lastDebounceTime = millis();
    }
  }
}

void sendButtonState(bool btn1, bool btn2) {
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;

    http.begin(serverUrl);
    http.addHeader("Content-Type", "application/json");

    // Create JSON payload
    String jsonPayload = "{ \"button1\": " + String(btn1 ? "true" : "false") +
                         ", \"button2\": " + String(btn2 ? "true" : "false") +
                         " }";

    int httpResponseCode = http.POST(jsonPayload);

    if (httpResponseCode > 0) {
      String response = http.getString();
      Serial.println(httpResponseCode);
      Serial.println(response);
    } else {
      Serial.print("Error on sending POST: ");
      Serial.println(httpResponseCode);
    }

    http.end();
  } else {
    Serial.println("WiFi Disconnected");
  }
}
