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
				<button @click="ModelChange">自动模式</button>
				定时喂食
				<uni-number-box v-model = "feedTime" :min="0" :max="9"></uni-number-box>
				<button @click="TimingFeed">点击投喂</button>
				<view class="reflash">
					<button @click="Reflash" >刷新</button>
				</view>
			</view>
		
			<view class="controlManual">
				<view class=" controlManualContent">
				灯带开关
				<button>灯带开关</button>
				水泵开关
				<button>水泵开关</button>
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
			const QualityPop = ref()
			const TempPop = ref()
			const mqttStatus = ref('')
			const autoStatus = ref(true)
			const feedTime = ref(2)

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
			
			const ModelChange = ()=>{
				uni.request({
					url:'http://10.149.3.126:8888/autoControl',
					method:'POST',
					data:{
						autoStatus:autoStatus.value
					},
				})
			}
			const TimingFeed = ()=>{
				console.log(feedTime.value)
				uni.request({
					url:'http://10.149.3.126:8888/TimingFeed',
					method:'POST',
					data:{
						feedTime:feedTime.value,
						},
						header: { 'content-type': 'application/json' },
					// data:{feedTime:feedTime.value},
					success(){
						console.log(`将在${feedTime.value}小时后喂食`)
					}
				})
			}
			const Reflash = ()=>{
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
				mqttStatus,Reflash,feedTime,TimingFeed

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
