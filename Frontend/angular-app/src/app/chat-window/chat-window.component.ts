import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-chat-window',
  template: `
    <div class="chat-window-container">
      <div class="chat-message-container">
        <div *ngFor="let chat of chatHistory; let i = index" [class.bot-message]="chat.sender === 'Bot'" [class.user-message]="chat.sender === 'You'">
          <strong>{{ chat.sender }}: </strong>{{ chat.message }}
        </div>
      </div>
      <div class="message-input-container">
        <textarea class="message-input" placeholder="Type your message here..." [(ngModel)]="message" (keyup.enter)="sendMessage()"></textarea>
        <button class="send-button" (click)="sendMessage()">Send</button>
      </div>
    </div>
  `,
  styleUrls: ['./chat-window.component.css']
})
export class ChatWindowComponent {
  @Input() sendRequest: (message: string) => Promise<string> = async (message: string) => {
    throw new Error('sendRequest function not provided.');
  };

  chatHistory: { sender: string, message: string | void }[] = [];
  message: string = '';

  constructor(private http: HttpClient) {}

  async sendMessage() {
    if (!this.message.trim()) return;

    console.log('Message to send:', this.message); 

    try {
      const response = await this.sendRequest(this.message);
      this.chatHistory.push({ sender: 'You', message: this.message }, { sender: 'Bot', message: response });
    } catch (error) {
      console.error("Error:", error);
      this.chatHistory.push({ sender: 'You', message: this.message }, { sender: 'Bot', message: 'Failed to generate response!' });
    }

    // Clear the message input
    this.message = '';
  }
}