import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  template: `
    <div class="App">
      <h3 class="title">Angular AI ChatBot</h3>
      <app-chat-window [sendRequest]="sendRequest"></app-chat-window>
    </div>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  sendRequest: (message: string) => Promise<string>;

  constructor(private http: HttpClient) {
    this.sendRequest = async (message: string) => {
      try {
        const response = await this.http.post("http://localhost:5000/api", { message }).toPromise();
        return response as string; // Assuming response is a string or can be converted to a string
      } catch (error) {
        console.error("Error:", error);
        return 'Failed to generate response!';
      }
    };
  }
}
