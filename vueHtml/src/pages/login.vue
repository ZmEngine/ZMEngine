<template>
    <div class="htmleaf-container">
    <header class="htmleaf-header">
        <h1>
          {{appname}}
        <span>后台管理</span>
        </h1>

    </header>
    <div id="app_login" class="demo form-bg" style="padding: 20px 0;">
        <div class="container">
            <div class="row">
                <div class="col-md-offset-3 col-md-6">
                    <div class="form-horizontal" >
                        <span class="heading">用户登录</span>
                        <div class="form-group">
                            <input runat="server" type="text" class="form-control" id="inputEmail3" v-model="username" placeholder="管理员账户">
                            <i class="fa fa-user"></i>
                        </div>
                        <div class="form-group help">
                            <input runat="server" type="password" class="form-control" id="inputPassword3" v-model="upwd" placeholder="密码">
                            <i class="fa fa-lock"></i>
                            <a href="#" class="fa fa-question-circle"></a>
                        </div>
                        <div style="color:red;" id="showjg" runat="server">{{loginerr}}</div>
                        <div class="form-group">

                            <button class="btn btn-default" v-on:click="Gologin">登录</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</div>
</template>
<script>
import { getUser } from '../service/getData'
import {mapMutations} from 'vuex'
export default {
  name: 'HelloWorld',
  data () {
    return {
      message: 'Hello World!',
      appname: this.env.appName,
      username: '',
      loginerr: '',
      upwd: ''
    }
  },
  // 在 `methods` 对象中定义方法
  methods: {
    ...mapMutations([
      'InsYongHu'
    ]),
    async Gologin (event) {
      this.loginerr = ''
      let jg = await getUser(this.username, this.upwd)
      console.log(jg)
      if (jg.data.isok) {
        this.InsYongHu(jg.data.jg)
        this.$router.push('/home')
      } else {
        this.loginerr = jg.data.msg
      }
    }
  }
}
</script>
 <style type="text/css">
    .form-bg {
        background: #00b4ef;
    }

    .form-horizontal {
        background: #fff;
        padding-bottom: 40px;
        border-radius: 15px;
        text-align: center;
    }

        .form-horizontal .heading {
            display: block;
            font-size: 35px;
            font-weight: 700;
            padding: 35px 0;
            border-bottom: 1px solid #f0f0f0;
            margin-bottom: 30px;
        }

        .form-horizontal .form-group {
            padding: 0 40px;
            margin: 0 0 25px 0;
            position: relative;
        }

        .form-horizontal .form-control {
            background: #f0f0f0;
            border: none;
            border-radius: 20px;
            box-shadow: none;
            padding: 0 20px 0 45px;
            height: 40px;
            transition: all 0.3s ease 0s;
        }

            .form-horizontal .form-control:focus {
                background: #e0e0e0;
                box-shadow: none;
                outline: 0 none;
            }

        .form-horizontal .form-group i {
            position: absolute;
            top: 12px;
            left: 60px;
            font-size: 17px;
            color: #c8c8c8;
            transition: all 0.5s ease 0s;
        }

        .form-horizontal .form-control:focus + i {
            color: #00b4ef;
        }

        .form-horizontal .fa-question-circle {
            display: inline-block;
            position: absolute;
            top: 12px;
            right: 60px;
            font-size: 20px;
            color: #808080;
            transition: all 0.5s ease 0s;
        }

            .form-horizontal .fa-question-circle:hover {
                color: #000;
            }

        .form-horizontal .main-checkbox {
            float: left;
            width: 20px;
            height: 20px;
            background: #11a3fc;
            border-radius: 50%;
            position: relative;
            margin: 5px 0 0 5px;
            border: 1px solid #11a3fc;
        }

            .form-horizontal .main-checkbox label {
                width: 20px;
                height: 20px;
                position: absolute;
                top: 0;
                left: 0;
                cursor: pointer;
            }

                .form-horizontal .main-checkbox label:after {
                    content: "";
                    width: 10px;
                    height: 5px;
                    position: absolute;
                    top: 5px;
                    left: 4px;
                    border: 3px solid #fff;
                    border-top: none;
                    border-right: none;
                    background: transparent;
                    opacity: 0;
                    -webkit-transform: rotate(-45deg);
                    transform: rotate(-45deg);
                }

            .form-horizontal .main-checkbox input[type=checkbox] {
                visibility: hidden;
            }

                .form-horizontal .main-checkbox input[type=checkbox]:checked + label:after {
                    opacity: 1;
                }

        .form-horizontal .text {
            float: left;
            margin-left: 7px;
            line-height: 20px;
            padding-top: 5px;
            text-transform: capitalize;
        }

        .form-horizontal .btn {
            float: right;
            font-size: 14px;
            color: #fff;
            background: #00b4ef;
            border-radius: 30px;
            padding: 10px 25px;
            border: none;
            text-transform: capitalize;
            transition: all 0.5s ease 0s;
        }

    @media only screen and (max-width: 479px) {
        .form-horizontal .form-group {
            padding: 0 25px;
        }

            .form-horizontal .form-group i {
                left: 45px;
            }

        .form-horizontal .btn {
            padding: 10px 20px;
        }
    }
</style>
