<template>
	<view>
		<view class="control">
				<view class="controlAuto">
					自动/手动模式切换
					<button @click="autoControl">自动模式</button>
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
						<button>灯带开关</button>
						水泵开关
						<button>水泵开关</button>
					</view>
		
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
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
</style>
