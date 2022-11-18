//将四个模块请求的接口函数统一暴露
import * as trademark from './product/tradeMark';
import * as attr from './product/Attr';
import * as spu from './product/Spu';
import * as sku from './product/Sku';

//对外暴露
export default {
    trademark,
    attr,
    sku,
    spu,
}