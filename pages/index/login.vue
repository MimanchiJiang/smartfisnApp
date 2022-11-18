<template>
	<div class="login">
		<div class="login-logo">
			<i class="iconfont icon-Fish icon"></i>
			<span>智能鱼缸系统</span>
		</div>
		<div class="form">
			<h3 @click="showRegister">创建账户</h3>
			<div v-bind:class="{ show: isShowRegister }" class="register">
				<input v-model="register.username" type="text" placeholder="用户名" />
				<input v-model="register.password" @keyup.enter="onRegister" type="password" placeholder="密码" />
				<p v-bind:class="{ error: register.isError }">
					{{ register.notice }}
				</p>
				<div type="submit" class="button" @click="onRegister" @keydown.enter="onRegister">创建账号</div>
			</div>
			<h3 @click="showLogin">登录</h3>
			<div v-bind:class="{ show: isShowLogin }" class="login">
				<input type="text" v-model="login.username" placeholder="输入用户名" />
				<input @keyup.enter="onLogin" type="password" v-model="login.password" placeholder="密码" />
				<p v-bind:class="{ error: login.isError }">123123s{{ login.notice }}</p>
				<div class="button" @click="onLogin" @keydown.enter="onLogin">登录</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		ref
	} from 'vue'
	export default {
		setup(props, context) {
			const isShowLogin = ref(true)
			const isShowRegister = ref(false)
			const login = ref({
				username: "",
				password: "",
				notice: "请输入用户名和密码",
				isError: false,
			})
			const register = ref({
				username: "",
				password: "",
				notice: "创建账号后，请记住用户名和密码",
				isError: false,
			})
			const showLogin = () => {
				isShowLogin.value = true
				isShowRegister.value = false
			}
			const showRegister = () => {
				isShowLogin.value = false;
				isShowRegister.value = true;
			}
			const onRegister = () => {
				if (!/^[\w\u4e00-\u9fa5]{3,15}$/.test(register.value.username)) {
					register.value.isError = true;
					register.value.notice = "用户名3~15个字符，仅限于字母数字下划线中文";
					return;
				}
				if (!/^.{6,16}$/.test(register.value.password)) {
					register.value.isError = true;
					register.value.notice = "密码长度为6~16个字符";
					return;
				}
				// axios({
				//     url: 'http://localhost:8888/register',
				//     method: 'POST',
				//     responseType: 'json',
				//     data: JSON.stringify({ username: register.value.username, password: register.value.password })
				// }).then(() => {
				//     console.log('发送成功')
				// })

			}
			const onLogin = () => {
				if (!/^[\w\u4e00-\u9fa5]{3,15}$/.test(login.value.username)) {
					login.value.isError = true;
					login.value.notice = "用户名3~15个字符，仅限于字母数字下划线中文";
					return;
				}
				if (!/^.{6,16}$/.test(login.value.password)) {
					login.value.isError = true;
					login.value.notice = "密码长度为6~16个字符";
					return;
				}
				router.push({
					path: 'doc/equipment'
				})

			}
			const close = () => {
				context.emit('update:visible', false)
			}
			return {
				isShowLogin,
				isShowRegister,
				login,
				register,
				showLogin,
				showRegister,
				onRegister,
				onLogin,
				close
			}
		},
	}
</script>

<style lang="scss" scoped>
	// 引入icon图标
	@import '../../iconfont.css'; 
	

	.login {
		background-color: #d1e3f8;
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
			   &-logo{
				   padding: 20px;
				   margin-top: -150px;
				   width: 100%;
				   display: flex;
				   justify-content: center;
				   align-items: center;
				   .icon{
					   font-size: 40px;
					   margin-right: 15px;
				   }
				   span{
					   font-size: 30px;
				   }
			   }
	}

	.form {
		border: 1px solid #ccc;
		overflow: hidden;
		background-color: transparent;
		width: 70%;

		h3 {
			margin-top: -1px;
			padding: 10px 20px;
			font-weight: normal;
			font-size: 16px;
			border-top: 1px solid #eee;
			cursor: pointer;

			&:ntn-of-type(2) {
				border-bottom: 1px solid #eee;
			}
		}

		.button {
			background-color: rgb(83, 118, 88);
			height: 36px;
			line-height: 36px;
			text-align: center;
			font-weight: bold;
			color: #fff;
			border-radius: 4px;
			margin-top: 18px;
			cursor: pointer;
			width: 80%;
		}

		.login,
		.register {
			padding: 0px 20px;
			height: 0px;
			overflow: hidden;
			transition: height 0.5s;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;

			&.show {
				height: 200px;
			}

			border-top: 1px solid #eee;

			input {
				display: block;
				width: 80%;
				height: 35px;
				line-height: 35px;
				padding: 0 6px;
				border-radius: 4px;
				border: 1px solid #ccc;
				outline: none;
				font-size: 14px;
				margin-top: 10px;
			}

			input:focus {
				border: 3px solid #9dcaf8;
			}

			p {
				font-size: 12px;
				margin-top: 10px;
				color: #444;
			}

			.error {
				color: red;
			}
		}

		.login {
			border-top: 0;
		}
	}
</style>
