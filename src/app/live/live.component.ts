import {Component} from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import {ZoomMtg} from '@zoomus/websdk';

ZoomMtg.setZoomJSLib('https://source.zoom.us/1.7.4/lib', '/av');

ZoomMtg.preLoadWasm();
ZoomMtg.prepareJssdk();

@Component({
  selector: 'app-live',
  templateUrl: './live.component.html',
  styleUrls: ['./live.component.css']
})
export class LiveComponent {

  constructor() {
  }

  public meetConfig: any;
  public signature: any;

  liveForm = new FormGroup({
    name: new FormControl(''),
    meeting_number: new FormControl(''),
    join_url: new FormControl(''),
  });


  gotoLive() {
    let name = this.liveForm.value.name;
    let url = this.liveForm.value.join_url
    let mm = this.liveForm.value.meeting_number
    this.SetConfig(mm, name, url);

  }

  SetConfig(mid, uname, llurn) {
    this.meetConfig = {
      apiKey: "",
      apiSecret: "",
      meetingNumber: mid,
      userName: uname,
      passWord: '',
      email: '',
      leaveUrl: llurn,
      role: 0,
    };

    this.signature = ZoomMtg.generateSignature({
      meetingNumber: this.meetConfig.meetingNumber,
      apiKey: this.meetConfig.apiKey,
      apiSecret: this.meetConfig.apiSecret,
      role: this.meetConfig.role,
      success: res => {
        console.log(this.meetConfig.leaveUrl)
        console.log(res.result);
      }
    })

    ZoomMtg.init({
      debug: true, //optional
      leaveUrl: this.meetConfig.leaveUrl,
      webEndpoint: 'PSO web domain', // PSO option
      showMeetingHeader: false, //option
      disableInvite: false, //optional
      disableCallOut: false, //optional
      disableRecord: false, //optional
      disableJoinAudio: false, //optional
      audioPanelAlwaysOpen: true, //optional
      showPureSharingContent: false, //optional
      isSupportAV: true, //optional,
      isSupportChat: true, //optional,
      isSupportQA: true, //optional,
      isSupportCC: true, //optional,
      screenShare: true, //optional,
      rwcBackup: '', //optional,
      videoDrag: true, //optional,
      sharingMode: 'both', //optional,
      videoHeader: true, //optional,
      isLockBottom: true, // optional,
      isSupportNonverbal: true, // optional,
      isShowJoiningErrorDialog: true, // optional,
      inviteUrlFormat: '', // optional
      loginWindow: {  // optional,
        width: 600,
        height: 480
      },
      success: res => {
        ZoomMtg.join({
          meetingNumber: this.meetConfig.meetingNumber,
          userName: this.meetConfig.userName,
          userEmail: this.meetConfig.email,
          passWord: this.meetConfig.passWord,
          apiKey: this.meetConfig.apiKey,
          signature: this.signature,
          participantId: 'UUID',
          success: function (res) {
            console.log('this is success application');
            console.log(res)
          },
          error: function (res) {
            console.log(this.meetingNumber);
            console.log('there was a problems');
            console.log(res)
          }
        });
      }
    });
  }

}
