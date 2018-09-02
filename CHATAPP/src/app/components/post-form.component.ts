/*
* Created By Suyash Tiwari
* on 2 Sept 2018
*/
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-form',
  template: `
    <div class="row">
      <div class="col s12 m12 l10">
        <div class="card postDiv">
          <div class="card-content">
            <form>
              <div class="formDiv">
                <textarea id="textarea1" class="materialize-textarea"></textarea>
                <div class="file-field input-field">
                  <div class="row">
                    <div class="col s6">
                      <div class="btn">
                        <span>
                          <i class="material-icons">image</i>
                          Image
                        </span>
                        <input type="file">
                      </div>
                      <div class="file-path-wrapper">
                        <input class="file-path validate" type="text">
                      </div>
                    </div>
                    <div class="col s6">
                      <button class="btn postBtn">
                        Post
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .postDiv {
      background-color: #64b5f6;
    }

    form {
      background-color: #fff;
    }

    .formDiv {
      margin: 0px 20px 0px 20px;
    }

    .addImageBtn {
      margin-bottom: 5px;
    }

    .postBtn {
      float: right;
      margin-bottom: 5px;
    }

    .file-field input[type='file'] {
      width: 70% !important;
    }

  `]
})
export class PostFormComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
