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
						时间:{{timestampToTime(time)}}
					</view>
				</uni-card>
			</view>
			<view class="showDataTemp">
				<uni-card title="温度传感器" thumbnail="../../static/temperature.png">
					<view>
						数值:{{temp}}
					</view>
					<view>
						时间:{{timestampToTime(time)}}
					</view>
				</uni-card>

			</view>
		</view>
		<view class="control">
			<view class="controlAuto">
				自动/手动模式切换
				<button @click="autoControl"  v-text="modelBtnText"></button>
				定时喂食
				<uni-number-box v-model="servoTime" :min="0" :max="9"></uni-number-box>
				<button @click="TimingFeed">点击投喂</button>
				<view class="reflash">
					<button @click="Reflash">刷新</button>
				</view>
			</view>

			<view class="controlManual">
				<view class=" controlManualContent">
					灯带开关
					<button @click="lightControl" v-text="lightBtnText"></button>
					水泵开关
					<button @click="pumpControl" v-text="pumpBtnText"></button>
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
			const quality = ref('')
			const temp = ref('')
			const time = ref('')
			const timer = ref("")
			const mqttStatus = ref('')
			const autoStatus = ref(true)
			const lightStatus = ref(false)
			const pumpStatus = ref(false)
			const servoTime = ref(2)
			const modelBtnText = ref('自动模式')
			const lightBtnText = ref('开灯')
			const pumpBtnText = ref('开水泵')

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
			const pumpControl = ()=>{
				console.log("切换前："+pumpStatus.value)
				pumpStatus.value = !pumpStatus.value
				uni.request({
					url:'http://10.149.3.126:8888/pump',
					method:'POST',
					data:JSON.stringify({pump:pumpStatus.value}),
					success() {
						if(pumpStatus.value == true){
							pumpBtnText.value = "关水泵"
						}else{
							pumpBtnText.value = "开水泵"
						}
					}
				})
			}
			//灯带控制
			const lightControl = () =>{
				console.log("切换前："+lightStatus.value)
				lightStatus.value = !lightStatus.value
				uni.request({
					url:'http://10.149.3.126:8888/light',
					method:'POST',
					data:JSON.stringify({light:lightStatus.value}),
					success() {
						if(lightStatus.value == true){
							lightBtnText.value = "关灯"
						}else{
							lightBtnText.value = "开灯"
						}
						console.log("切换后："+lightStatus.value)
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
							modelBtnText.value = "自动模式"
						} else {
							modelBtnText.value = "手动模式"
						}
						console.log(autoStatus.value)
						console.log('切换成功')
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
						console.log(`将在${servoTime.value}小时后喂食`)
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
			const timestampToTime = (timestamp) => {
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
				timestampToTime,
				mqttStatus,
				Reflash,
				servoTime,
				TimingFeed,
				autoControl,
				autoStatus,
				modelBtnText,
				lightBtnText,
				lightStatus,
				lightControl,
				pumpBtnText,
				pumpControl,
				pumpStatus
				
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
