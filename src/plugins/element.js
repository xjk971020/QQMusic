import Vue from "vue";
import {
  Button,
  Message,
  MessageBox,
  Table,
  TableColumn,
  InfiniteScroll,
  Loading,
  Card,
  Carousel,
  CarouselItem,
  Tooltip,
  Select,
  Option,
  Pagination
} from "element-ui";
import elTableInfiniteScroll from "el-table-infinite-scroll";

Vue.use(Button);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(InfiniteScroll);
Vue.use(Loading);
Vue.use(Card);
Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(elTableInfiniteScroll);
Vue.use(Tooltip);
Vue.use(Select);
Vue.use(Option);
Vue.use(Pagination);

Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox.confirm;
