import React from 'react'
import { province as provinceData } from 'antd-mobile-demo-data';
import { ListView, List, SearchBar } from 'antd-mobile';
import Temp from '../common/dataTemp/index'
console.log('provinces data:',provinceData)
const { Item } = List;

class FriendList extends React.Component {
  constructor(props) {
    super(props);
    const getSectionData = (dataBlob, sectionID) => dataBlob[sectionID];
    const getRowData = (dataBlob, sectionID, rowID) => dataBlob[rowID];

    const dataSource = new ListView.DataSource({
      getRowData,
      getSectionHeaderData: getSectionData,
      rowHasChanged: (row1, row2) => row1 !== row2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
    });

    this.createDs = (ds, province) => {
      const dataBlob = {};
      const sectionIDs = [];
      const rowIDs = [];
      Object.keys(province).forEach((item, index) => {
        sectionIDs.push(item);
        dataBlob[item] = item;
        rowIDs[index] = [];

        province[item].forEach((jj) => {
          rowIDs[index].push(jj.value);
          dataBlob[jj.value] = jj.label;
        });
      });
      return ds.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs);
    };
    this.state = {
      inputValue: '',
      dataSource: this.createDs(dataSource, provinceData),
      // dataSource: dataSource.cloneWithRowsAndSections(this.provinceData, sectionIDs, rowIDs),
      headerPressCount: 0,
      provinceData:null
    };
  }

  onSearch = (val) => {
    const pd = { ...provinceData };
    Object.keys(pd).forEach((item) => {
      pd[item] = pd[item].filter(jj => jj.spell.toLocaleLowerCase().indexOf(val) > -1);
    });
    this.setState({
      inputValue: val,
      dataSource: this.createDs(this.state.dataSource, pd),
    });
  }
  componentWillUpdate(nextProps, nextState){
      if(this.props == nextProps) return false;
      if(nextProps.fetchState.data){
          this.setState({
              provinceData:nextProps.fetchState.data
          })
      }
  }
  render() {
    return (
      <div style={{height:this.props.height,  position: 'relative' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0,height:'0.88rem' }}>
          <SearchBar
            value={this.state.inputValue}
            placeholder="搜索"
            onChange={this.onSearch}
            onClear={() => { console.log('onClear'); }}
            onCancel={() => { console.log('onCancel'); }}
          />
        </div>
        <ListView.IndexedList
          dataSource={this.state.dataSource}
          renderHeader={() => <span>　</span>}
          renderFooter={() => <span>　</span>}
          renderSectionHeader={sectionData => (<div className="ih">{sectionData}</div>)}
          renderRow={rowData => (<Item>{rowData}</Item>)}
          className="am-list"
          stickyHeader
          stickyProps={{
            stickyStyle: { zIndex: 999 },
          }}
          style={{
            position:'relative'
          }}
          quickSearchBarStyle={{
            top: 85,
            position:'absolute'
          }}
          delayTime={10}
          delayActivityIndicator={<div style={{ padding: 25, textAlign: 'center' }}>渲染中...</div>}
        />
    </div>);
  }
}


export default Temp({
    url:'/friendList',   // app 的路由
    path:'/api/friendList/list',  // API 的路由,此处的api不能漏掉。否则就会报错
    params:{},  // API 的参数
    component:FriendList // 组件的名称
})
// export default FriendList