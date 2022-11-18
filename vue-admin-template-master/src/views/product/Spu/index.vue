<template>
    <div>
        <el-card shadow="always" style=" margin:20px 0px ">
            <!-- 三级联动已经是全局组件了 -->
            <CategorySelect @getCategory="getCategory" :show="!show" />
        </el-card>
        <el-card shadow="always">
            <!-- 底部这里将来是有三部分进行切换 -->
            <div>
                <!-- 展示SPU列表的结构 -->
                <el-button type="primary" size="default" icon="el-icon-plus">添加SPU</el-button>

                <el-table :data="records" border stripe>
                    <el-table-column type="index" prop="prop" label="序号" width="80px" align="center">
                    </el-table-column>
                    <el-table-column prop="spuName" label="spu名称" width="width">
                    </el-table-column>
                    <el-table-column prop="description" label="spu描述" width="width">
                    </el-table-column>
                    <el-table-column prop="prop" label="操作" width="width">
                        <template slot-scope="{row,$index}">
                            <!-- 这里按钮将来用hintButton替换 -->
                            <hint-button type="success" icon="el-icon-plus" size="mini" title="添加sku"
                                @click="addSku(row)"></hint-button>
                            <hint-button type="warning" icon="el-icon-edit" size="mini" title="修改spu"
                                @click="updateSpu(row)"></hint-button>
                            <hint-button type="info" icon="el-icon-info" size="mini" title="查看当前spu全部sku列表"
                                @click="handler(row)"></hint-button>
                            <el-popconfirm title="这是一段内容确定删除吗？" @onConfirm="deleteSpu(row)">
                                <hint-button type="danger" icon="el-icon-delete" size="mini" title="删除spu"
                                    slot="reference"></hint-button>
                            </el-popconfirm>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <!-- 
    分页器 
    当前第几页 数据总条数 每一页展示的条数  连续页码数
  

     current-page:代表的是当前第几页
      total：代表分页器一共需要展示数据条数
      page-size：代表的是每一页需要展示多少条数据
      page-sizes：代表可以设置每一页展示多少条数据
      layout：可以实现分页器布局
      pager-count:按钮的数量  如果 9  连续页码是7

  -->
            <el-pagination style="margin-top:20px;text-align:center" :current-page="page" :total="total"
                :page-size="limit" :pager-count="7" :page-sizes="[3, 5, 10]" @size-change="sizeChange"
                @current-change="getSpuList" layout="prev, pager, next, jumper, ->, sizes, total">
            </el-pagination>

        </el-card>
    </div>
</template>
  
<script>
export default {
    name: 'Spu',
    data() {
        return {
            category1Id: "",
            category2Id: "",
            category3Id: "",
            //控制三级联动的可操作性
            show: true,
            //代表第几页数据
            page: 1,
            //代表每页展示几条数据
            limit: 3,
            records: [], //spu列表的数据
            total: 0, //分页器一共需要展示数据的条数
        }
    },
    methods: {
        //自定义事件的回调函数
        getCategory({ categoryId, level }) {
            //区分三级分类相应的id，以及父组件进行存储
            if (level == 1) {
                this.category1Id = categoryId;
                this.category2Id = "";
                this.category3Id = "";
            } else if (level == 2) {
                this.category2Id = categoryId;
                this.category3Id = "";
            } else {
                //代表三级分类的id有了
                this.category3Id = categoryId;
                //发请求获取平台的属性数据
                this.getSpuList();
            }
        },
        //获取SPU的数据
        async getSpuList(pages = 1) {
            this.page = pages;
            const { page, limit, category3Id } = this;
            let result = await this.$API.spu.reqSpuList(page, limit, category3Id);

            if (result.code == 200) {
                this.total = result.data.total;
                this.records = result.data.records;
            }
        },
        //当分页器某一页需要展示数据条数发生变化的时候会触发
        sizeChange(limit) {
            //整理参数
            this.limit = limit;
            //发请求
            this.getSpuList();
        },

    }
}
</script>
  
<style>

</style>