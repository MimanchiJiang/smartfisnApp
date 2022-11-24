<template>
	<view class="box">
		<view class="TopBar">
			<view class="logo">
			</view>
			<view class="connectStatus">
				<view>mqtt:</view>
				<view :class="mqttStatus ? 'mqtt-status-greenCircle' : 'mqtt-status-redCircle'">
				</view>
			</view>

		</view>
		<view class="showData">
			<view class="showDataQuality">
				<uni-card title="水质传感器" thumbnail="../../static/quality.png">
					<view>
						数值:{{quality}}
					</view>
					<view>
						时间:{{timeShift(time)}}
					</view>
				</uni-card>
			</view>
			<view class="showDataTemp">
				<uni-card title="温度传感器" thumbnail="../../static/temperature.png">
					<view>
						数值:{{temp}}
					</view>
					<view>
						时间:{{timeShift(time)}}
					</view>
				</uni-card>

			</view>
		</view>
		<view class="control">
			<view class="controlAuto">
				<view class="controlAutoText">
					自动/手动模式切换
				</view>
				<button @click="autoControl" v-text="modelBtnText"></button>
				<uni-popup ref="autoControlPopupDom" type="message">
					<uni-popup-message :type="autoControlMessageType" :message="autoControlText" duration="2000">
					</uni-popup-message>
				</uni-popup>
				<view class="timingFeedText">
					定时喂食
				</view>
				<view class="numberBox">
					<uni-number-box class="numberBoxContent" v-model="servoTime" :min="0" :max="9"></uni-number-box>
				</view>
				<button @click="TimingFeed" class="TimingFeed">点击投喂</button>
				<uni-popup ref="timingFeedControlPopupDom" type="message">
					<uni-popup-message :type="timingFeedMessageType" :message="timingFeedText" duration="2000">
					</uni-popup-message>
				</uni-popup>

			</view>
			<view class="controlManual">
				<view class=" controlManualContent">
					<view class="lightControlText">
						灯带开关
					</view>
					<button @click="lightControl" v-text="lightBtnText"></button>
					<uni-popup ref="lightControlPopupDom" type="message">
						<uni-popup-message :type="lightControlMessageType" :message="lightText" duration="2000">
						</uni-popup-message>
					</uni-popup>
					<view class="pumpControlText">
						水泵开关
					</view>
					<button @click="pumpControl" v-text="pumpBtnText"></button>
					<uni-popup ref="pumpControlPopupDom" type="message">
						<uni-popup-message :type="pumpControlMessageType" :message="pumpText" duration="2000">
						</uni-popup-message>
					</uni-popup>
					<view class="reflash">
						<button @click="Reflash">刷新</button>
					</view>
				</view>

			</view>
		</view>
	</view>

</template>

<script>
	import {
		onShow,
		onLoad,
		onReady,
		onHide,
		onPullDownRefresh
	} from '@dcloudio/uni-app';
	import {
		ref
	} from 'vue'

	export default {
		setup() {
			//数值
			const quality = ref('')
			const temp = ref('')
			const time = ref('')
			//定时器
			const timer = ref("")
			//连接状态
			const mqttStatus = ref('')
			const autoStatus = ref(true)
			const lightStatus = ref(false)
			const pumpStatus = ref(false)
			//定时喂食默认值
			const servoTime = ref(1)
			//按钮文本内容
			const modelBtnText = ref('设备处于自动模式')
			const lightBtnText = ref('开灯')
			const pumpBtnText = ref('开水泵')
			//消息提示标签Dom
			const autoControlPopupDom = ref()
			const lightControlPopupDom = ref()
			const pumpControlPopupDom = ref()
			const timingFeedControlPopupDom = ref()
			//消息提示文本内容
			const pumpText = ref()
			const lightText = ref()
			const timingFeedText = ref()
			const autoControlText = ref()
			//消息提示类型
			const timingFeedMessageType = ref("success")
			const lightControlMessageType = ref("success")
			const pumpControlMessageType = ref("success")
			const autoControlMessageType = ref("success")


			//消息提示开启函数
			const autoControlPopupOpen = () => {
				autoControlPopupDom.value.open('top')
			}
			const lightControlPopupOpen = () => {
				lightControlPopupDom.value.open('top')
			}
			const pumpControlPopupOpen = () => {
				pumpControlPopupDom.value.open('top')
			}
			const timingFeedControlPopupOpen = () => {
				timingFeedControlPopupDom.value.open('top')
			}
			

			onShow(() => {
				uni.request({
					url: 'http://10.149.3.126:8888/mqtt',
					method: 'POST',
					success(res) {
						if (res.data == 'connected') {
							mqttStatus.value = true
						} else {
							mqttStatus.value = false
						}
						console.log(mqttStatus.value)
					}
				})
			})

			onReady(() => {
				timer.value = setInterval(() => {
					uni.request({
						url: 'http://10.149.3.126:8888/data',
						method: 'POST',
						success: (res) => {
							temp.value = res.data[0].temp
							quality.value = res.data[0].quality
							time.value = res.data[0].time
						}
					})
				}, 1000)
			})

			onHide(() => {
				clearInterval(timer.value)
				console.log('定时器被削除了')
			})
			//水泵控制
			const pumpControl = () => {
				console.log("切换前：" + pumpStatus.value)
				pumpStatus.value = !pumpStatus.value
				uni.request({
					url: 'http://10.149.3.126:8888/pump',
					method: 'POST',
					data: JSON.stringify({
						pump: pumpStatus.value
					}),
					success() {
						if (pumpStatus.value == true) {
							pumpBtnText.value = "关水泵"
							pumpText.value = '水泵已开启'
							pumpControlMessageType.value = 'success'
							pumpControlPopupOpen()
						} else {
							pumpBtnText.value = "开水泵"
							pumpText.value = '水泵已关闭'
							pumpControlMessageType.value = 'success'
							pumpControlPopupOpen()
						}
					},
					fail() {
						console.log('投喂失败！请刷新重试')
						timingFeedText.value = '投喂失败！请刷新重试'
					}
				})
			}
			//灯带控制
			const lightControl = () => {
				console.log("切换前：" + lightStatus.value)
				lightStatus.value = !lightStatus.value
				uni.request({
					url: 'http://10.149.3.126:8888/light',
					method: 'POST',
					data: JSON.stringify({
						light: lightStatus.value
					}),
					success() {
						if (lightStatus.value == true) {
							lightBtnText.value = "关灯"
							lightText.value = '灯光已开启'
							lightControlMessageType.value = "success"
							lightControlPopupOpen()
						} else {
							lightBtnText.value = "开灯"
							lightText.value = '灯光已关闭'
							lightControlMessageType.value = "success"
							lightControlPopupOpen()
						}
					},
					fail() {
						lightText.value = '灯光控制失败，请重试！'
						lightControlMessageType.value = 'error'
						lightControlPopupOpen()
					}
				})
			}
			//模式切换
			const autoControl = () => {
				console.log(autoStatus.value)
				autoStatus.value = !autoStatus.value
				uni.request({
					url: 'http://10.149.3.126:8888/autoControl',
					method: 'POST',
					data: JSON.stringify({
						autoStatus: autoStatus.value
					}),
					success() {
						if (autoStatus.value == true) {
							modelBtnText.value = "设备处于自动模式"
						} else {
							modelBtnText.value = "设备处于手动模式"
						}
						autoControlMessageType.value = "success"
						autoControlText.value = "模式切换成功"
						autoControlPopupOpen()
					},
					fail() {
						autoControlMessageType.value = "error"
						autoControlText.value = "模式切换失败"
						autoControlPopupOpen()
					}
				})
			}
			//定时喂食
			const TimingFeed = () => {
				console.log(servoTime.value)
				uni.request({
					url: 'http://10.149.3.126:8888/TimingFeed',
					method: 'POST',
					data: JSON.stringify({
						servoTime: servoTime.value
					}),
					success() {
						timingFeedMessageType.value = "success"
						timingFeedText.value = `投喂成功！将在${servoTime.value}小时后喂食`
						timingFeedControlPopupOpen()
					},
					fail() {
						timingFeedMessageType.value = "error"
						timingFeedText.value = `投喂失败！请刷新后重试`
						timingFeedControlPopupOpen()
					}
				})
			}
			//刷新
			const Reflash = () => {
				uni.request({
					url: 'http://10.149.3.126:8888/mqtt',
					method: 'POST',
					success(res) {
						if (res.data == 'connected') {
							mqttStatus.value = true
						} else {
							mqttStatus.value = false
						}
						console.log(mqttStatus.value)
					}
				})
			}
			//下拉刷新
			onPullDownRefresh(() => {
				uni.request({
					url: 'http://10.149.3.126:8888/mqtt',
					method: 'POST',
					success(res) {
						if (res.data == 'connected') {
							mqttStatus.value = true
						} else {
							mqttStatus.value = false
						}
						console.log(mqttStatus.value)
						uni.stopPullDownRefresh()
					}
				})
			})
			const timeShift = (timestamp) => {
				var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
				var Y = date.getFullYear() + '-';
				var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
				var D = date.getDate() + ' ';
				var h = (date.getHours() < 10 ? '0' + (date.getHours()) : date.getHours()) + ':';
				var m = (date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes()) + ':';
				var s = (date.getSeconds() < 10 ? '0' + (date.getSeconds()) : date.getSeconds());
				return Y + M + D + h + m + s;
			}

			return {
				temp,
				time,
				quality,
				timeShift,
				Reflash,
				servoTime,
				TimingFeed,
				autoControl,
				mqttStatus,
				autoStatus,
				pumpStatus,
				lightStatus,
				modelBtnText,
				lightBtnText,
				pumpBtnText,
				lightControl,
				pumpControl,
				pumpText,
				lightText,
				timingFeedText,
				autoControlText,
				timingFeedMessageType,
				lightControlMessageType,
				pumpControlMessageType,
				autoControlMessageType,
				timingFeedControlPopupDom,
				lightControlPopupDom,
				pumpControlPopupDom,
				autoControlPopupDom

			}
		}
	}
</script>

<style lang="scss">
	@import '../../iconfont.css';

	.box {
		display: flex;
		flex-direction: column;
		height: 100vh;

		.TopBar {
			height: 100rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 10px;

			.logo {
				height: 100%;
				width: 110rpx;
				background-image: url(../../static/Fish.png);
				background-size: 100% 100%;
			}

			.connectStatus {
				height: 100%;
				display: flex;
				justify-content: center;
				align-items: center;

				.mqtt-status-greenCircle {
					width: 20px;
					height: 20px;
					border-radius: 50%;
					background: green;
					background-image: radial-gradient(lime, transparent);
					background-size: 5px 5px;
				}

				.mqtt-status-redCircle {
					width: 20px;
					height: 20px;
					border-radius: 50%;
					background: rgb(221, 3, 3);
					background-image: radial-gradient(rgb(255, 153, 0), transparent);
					background-size: 5px 5px;
				}
			}

			.reflash {
				height: 100%;
			}
		}

		.showData {
			height: 600rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;

			.showDataQuality {
				width: 90%;
				height: 50%;

			}

			.showDataTemp {
				width: 90%;
				height: 50%;
			}
		}

		.control {
			width: 750rpx;
			flex: 1;
			display: flex;
			justify-content: space-around;

			.controlAuto {
				border-radius: 4px;
				width: 365rpx;
				box-shadow: rgb(0 0 0 / 8%) 0px 0px 3px 1px;


				.controlAutoText {
					text-align: center;
					font-size: 35rpx;
					padding: 20rpx 0;
				}

				.timingFeedText {
					text-align: center;
					font-size: 35rpx;
					padding: 20rpx 0;
				}

				.TimingFeed {
					margin-top: 20rpx;
				}

				.numberBox {
					display: flex;
					justify-content: center;
					align-items: center;

					.numberBoxContent {
						width: 200rpx;

					}
				}

			}

			.controlManual {
				border-radius: 4px;
				box-shadow: rgb(0 0 0 / 8%) 0px 0px 3px 1px;
				width: 365rpx;
				height: 100%;

			}
		}
	}
</style>
