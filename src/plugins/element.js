import Vue from "vue";
import {
  Button,
  Message,
  MessageBox,
  Table,
  TableColumn,
  InfiniteScroll,
  Loading,
  Card
} from "element-ui";
import elTableInfiniteScroll from "el-table-infinite-scroll";

Vue.use(Button);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(InfiniteScroll);
Vue.use(Loading);
Vue.use(Card);
Vue.use(elTableInfiniteScroll);

Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox.confirm;
