<template>
	<uni-data-checkbox v-model="value" :localdata="range" @change="change"></uni-data-checkbox>
		<view class="uni-container">
			<uni-table ref="table" :loading="loading" border stripe   emptyText="暂无更多数据" @selection-change="selectionChange">
				<uni-tr>
					<uni-th width="150" align="center">灯带</uni-th>
					<uni-th width="150" align="center">水泵</uni-th>
					<uni-th align="center">舵机</uni-th>
					<uni-th align="center">水质</uni-th>
					<uni-th align="center">温度</uni-th>
					<uni-th width="204" align="center">时间</uni-th>
				</uni-tr>
				<uni-tr v-for="(item, index) in historyArray" :key="index">
					<uni-td align="center">{{ item.light }}</uni-td>
					<uni-td align="center">
						{{ item.pump }}
					</uni-td>
					<uni-td align="center">
						{{ item.feed }}
					</uni-td>
					<uni-td align="center">
						{{ item.quality }}
					</uni-td>
					<uni-td align="center">{{ item.temp }}</uni-td>
					<uni-td align="center">{{ timeShift(item.time) }}</uni-td>
					</uni-tr>
			</uni-table>
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
	
	export default{
		setup(props, context) {
			const historyArray = ref([])
			const value = ref(0)
			const range= [{"value": "light","text": "灯带"	},{"value": "pump","text": "水泵"},{"value": "feed","text": "舵机"},{"value": "quality","text": "水质"},{"value": "temp","text": "温度"},{"value": "all","text": "全部"}]
			const pretreatment = (x)=>{
					x.forEach((e)=>
					{
						if (e.light && e.light == '0') {
						                //@ts-ignore
						                e.light = '关闭'
						            } else if(e.light && e.light == '1') {
						                //@ts-ignore
						                e.light = '开启'
						            }
						            //@ts-ignore
						            if (e.pump && e.pump == '0') {
						                //@ts-ignore
						                e.pump = '关闭'
						            } else if(e.pump && e.pump == '1') {
						                //@ts-ignore
						                e.pump = '开启'
						            }
						            //@ts-ignore
						            if (e.feed && e.feed == '0') {
						                //@ts-ignore
						                e.feed = '关闭'
						            } else if(e.feed && e.feed == '1') {
						                //@ts-ignore
						                e.feed = '开启'
						            }
					})
				}
			onReady(()=>{
				uni.request({
					//手机热点
					url: 'http://192.168.43.218:8888/history',
					//宽带
					// url:'http://10.149.3.126:8888/history ',
					method:'POST',
					success(res) {
						historyArray.value = res.data
						pretreatment(historyArray.value)
						console.log(historyArray.value)
					}
				})
			})
			const change = (e)=>{
				console.log(e.detail.value)
				 if (e.detail.value != 'all') {
				        uni.request({
				            url: 'http://192.168.43.218:8888/select',
				            method: 'POST',
				            responseType: 'json',
				            data: JSON.stringify({ input: e.detail.value })
				        }).then((res) => {
				            historyArray.value = res.data
							pretreatment(historyArray.value)
				            console.log(historyArray.value)
				        })
				    } else {
				        uni.request({
				            url: 'http://192.168.43.218:8888/history',
				            method: 'POST',
				        }).then((res) => {
				            historyArray.value = res.data
							pretreatment(historyArray.value)
				        })
				    }
			}
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
			
			return{
				historyArray,timeShift,range,value,change,pretreatment
			}
		}
		
	}
</script>



<style>
/* #ifndef H5 */
/* page {
	padding-top: 85px;
} */
/* #endif */
.uni-group {
	display: flex;
	align-items: center;
}

</style>
