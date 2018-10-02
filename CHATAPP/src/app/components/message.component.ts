import {AfterViewInit, Component, OnInit} from '@angular/core';
import {TokenService} from '../services/token.service';
import {MessageService} from '../services/message.service';
import {ActivatedRoute} from '@angular/router';
import {UsersService} from '../services/users.service';
import io from 'socket.io-client';

@Component({
  selector: 'app-message',
  template: `
    <div class="row">
      <div class="col s12">
        <div class="row">
          <div class="card">
            <div class="" style="background: #64b5f6 !important">
              <div class="col s12 imgCol">
                <img src="https://via.placeholder.com/50x50" class="circle">
              </div>
              <div class="row">
                <div class="col s10 nameCol">
                  <span>{{receivername}}</span>
                  <p class="isOnline">Online</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col s12 rowDiv" ngx-auto-scroll lock-y-offset="10" observe-attributes>
        <div class="row">
          <div class="col s12">
            <div class="message" *ngFor="let message of messageArray">
              <div class="left" *ngIf="user.data.username === message.receivername && user.data.username !== message.sendername">
                <div class="chat-bubble left slide-left">
                  <div class="message">{{message.body}}</div>
                </div>
              </div>
              <div class="right" *ngIf="user.data.username === message.sendername && user.data.username !== message.receivername">
                <div class="chat-bubble right slide-right">
                  <div class="message">{{message.body}}</div>
                </div>
              </div>
              <div class="cf"></div>
            </div>
            <div class="left" *ngIf="typing">
              <div class="chat-bubble left slide-left">
                <div class="message">{{receivername}} is typing</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col s12" style="margin: 0px;">
        <div class="row">
          <div class="card" style="height: 55px">
            <div class="inputRow">
              <form (ngSubmit)="SendMessage()">
                <div class="input-field inputField col s10">
                  <textarea name="message" [(ngModel)]="message" (keypress)="IsTyping()" class="materialize-textarea inputBox"></textarea>
                </div>
                <div class="input-field col s1 emojiDiv">
                  <div class="emojiBtn">Emoji</div>
                </div>
                <div class="input-field col s1">
                  <button class="suffix btn" type="submit">Send</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .bar-footer {
      overflow: visible !important;
    }

    .bar-footer textarea {
      resize: none;
      height: 25px;
    }

    img.profile-pic {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      position: absolute;
      bottom: 10px;
    }

    img.profile-pic.left {
      left: 10px;
    }

    img.profile-pic.right {
      right: 10px;
    }

    img.imgMsg {
      height: auto;
      width: auto;
      max-width: 100%;
      max-height: 100px;
    }

    .message {
      font-size: 16px;
    }

    .message-detail {
      white-space: nowrap;
      font-size: 14px;
    }

    .message-wrapper {
      position: relative;
      margin-top: 10px;
      z-index: 1000 !important;
    }

    .chat-bubble {
      border-radius: 10px;
      display: inline-block;
      padding: 10px 18px;
      position: relative;
      margin: 10px;
      max-width: 80%;
    }

    .chat-bubble:before {
      content: '\\00a0';
      display: block;
      height: 16px;
      width: 9px;
      position: absolute;
      bottom: -7.5px;
    }

    .chat-bubble.left {
      background: #f1f0f0;
      float: left;
      margin-left: 7px;
    }

    .chat-bubble.left:before {
      background: #f1f0f0;
      left: 10px;
      z-index: -1;
      border-radius: 10px;
      -webkit-transform: rotate(70deg) skew(5deg);
      transform: rotate(70deg) skew(5deg);
    }

    .chat-bubble.right {
      background: #64b5f6;
      color: #fff;
      float: right;
      margin-right: 7px;
    }

    .chat-bubble.right:before {
      z-index: -1;
      background: #64b5f6;
      border-radius: 10px;
      right: 10px;
      -webkit-transform: rotate(118deg) skew(-5deg);
      transform: rotate(118deg) skew(-5deg);
    }

    .chat-bubble.right a.autolinker {
      color: #fff;
      font-weight: bold;
    }

    .user-messages-top-icon {
      font-size: 28px;
      display: inline-block;
      vertical-align: middle;
      position: relative;
      top: -3px;
      right: 5px;
    }

    .msg-header-username {
      display: inline-block;
      vertical-align: middle;
      position: relative;
      top: -3px;
    }

    input,
    textarea,
    .item-input,
    .item-input-wrapper {
      background: #64b5f6;
      height: 38px;
    }

    .text-input {
      background: transparent !important;
    }

    .bold {
      font-weight: bold;
      color: white;
    }

    .boldLeft {
      color: red;
    }

    .cf {
      clear: both !important;
    }

    a.autolinker {
      color: #3b88c3;
      text-decoration: none;
    }

    .rowDiv {
      background: #ffffff !important;
      height: 61vh !important;
      max-height: 62vh !important;
      overflow-y: scroll !important;
      top: 0px;
      margin-top: -20px !important;
    }

    .footerDiv {
      height: 38px;
      bottom: 0px !important;
    }

    .inputField {
      height: 38px;
    }

    emoji-picker {
      width: 100% !important;
      right: 6px;
    }

    emoji-content {
      width: 100% !important;
    }

    .emojiBtn {
      font-size: 20px !important;
      background: inherit !important;
      border: none !important;
      text-align: center !important;
      margin-left: -10px !important;
    }

    .emojiDiv {
      width: 40px !important;
      margin-bottom: 0px !important;
    }

    .imgCircle {
      width: 50px !important;
      height: 50px !important;
      border-radius: 50% !important;
      margin: 0 auto !important;
      top: 20px !important;
    }

    .imgCol {
      width: 50px !important;
      margin-left: 20px !important;
      margin-top: 5px !important;
    }

    .nameCol span {
      font-size: 25px;
      font-weight: 600 !important;
      color: white !important;
      padding: 0px !important;
    }

    .nameCol {
      margin-left: 28px !important;
      height: auto !important;
      width: auto !important;
      padding: 0px !important;
    }

    .card {
      height: 60px;
    }

    .inputBox {
      color: white;
      padding: 10px;
    }

    .input-field {
      top: -9px !important;
    }

    .inputRow {
      margin: 0px 10px 0px 10px !important;
    }

    .isOnline {
      color: white;
      margin-top: -5px !important;
      padding: 0px !important;
      font-size: 15px;
    }

  `]
})
export class MessageComponent implements OnInit, AfterViewInit {

  receiver: string;
  receivername: string;
  user: any;
  receiverData: any;
  message: string;
  messageArray = [];
  socket: any;
  typingMessage;
  typing = false;

  constructor(private tokenService: TokenService,
              private msgService: MessageService,
              private route: ActivatedRoute,
              private usersService: UsersService) {
    this.socket = io('http://localhost:3000');
  }

  ngOnInit() {
    this.user = this.tokenService.GetPayload();
    this.route.params.subscribe(params => {
      this.receivername = params.name;
      this.GetUserByUsername(this.receivername);

      this.socket.on('refreshPage', () => {
        this.GetUserByUsername(this.receivername);
      });
    });
    this.socket.on('is_typing', data => {
      if (data.sender === this.receivername) {
        this.typing = true;
      }
    });

    this.socket.on('has_stopped_typing', data => {
      if (data.sender === this.receivername) {
        this.typing = false;
      }
    });
  }

  ngAfterViewInit() {
    const params = {
      room1: this.user.data.username,
      room2: this.receivername
    };

    this.socket.emit('join chat', params);
  }


  GetUserByUsername(name) {
    this.usersService.GetUserByName(name).subscribe(data => {
      console.log('hi', data);
      this.receiverData = data.result;
      this.GetMessages(this.user.data._id, data.result._id);
    });
  }

  GetMessages(senderId, receiverId) {
    this.msgService.GetAllMessages(senderId, receiverId).subscribe(data => {
      console.log(data);
      this.messageArray = data.message.message;
      console.log('message', this.messageArray);
    });
  }

  SendMessage() {
    console.log('i m out');
    if (this.message) {
      console.log('i m in');
      this.msgService.SendMessage(this.user.data._id, this.receiverData._id, this.receiverData.username, this.message)
        .subscribe((data) => {
          this.socket.emit('refresh', {});
          this.message = '';
        });
    }
  }

  IsTyping() {
    this.socket.emit('start_typing', {
      sender: this.user.data.username,
      receiver: this.receivername
    });

    if (this.typingMessage) {
      clearTimeout(this.typingMessage);
    }

    this.typingMessage = setTimeout(() => {
      this.socket.emit('stop_typing', {
        sender: this.user.data.username,
        receiver: this.receivername

      });
    }, 500);

  }

}
