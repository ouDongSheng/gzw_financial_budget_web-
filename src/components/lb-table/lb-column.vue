
<template>
  <el-table-column v-bind="$attrs"
    v-on="$listeners"
    :prop="column.prop"
    :label="column.label"
    :type="column.type"
    :index="column.index"
    :column-key="column.columnKey"
    :width="column.width"
    :min-width="column.minWidth"
    :fixed="column.fixed"
    :render-header="column.renderHeader"
    :sortable="column.sortable || false"
    :sort-method="column.sortMethod"
    :sort-by="column.sortBy"
    :sort-orders="column.sortOrders"
    :resizable="column.resizable || true"
    :formatter="column.formatter"
    :show-overflow-tooltip="column.showOverflowTooltip || false"
    :align="column.align || align || 'left'"
    :header-align="column.headerAlign || headerAlign || column.align || align || 'left'"
    :class-name="column.className"
    :label-class-name="column.labelClassName"
    :selectable="column.selectable"
    :reserve-selection="column.reserveSelection || false"
    :filters="column.filters"
    :filter-placement="column.filterPlacement"
    :filter-multiple="column.filterMultiple"
    :filter-method="column.filterMethod"
    :filtered-value="column.filteredValue">

    <template slot="header"
      slot-scope="scope">
      <lb-render v-if="column.renderHeader"
        :scope="scope"
	:fieldType="column.fieldType" 
        :render="column.renderHeader">
      </lb-render>
      <div :fieldType="column.fieldType" v-else>{{ scope.column.label }}</div>
    </template>

    <template slot-scope="scope">
      <lb-render
        :scope="scope"
        :render="column.render"
      >
      </lb-render>
    </template>

    <template v-if="column.children">
      <lb-column v-for="(col, index) in column.children"
        :key="index"

	:fieldType="column.fieldType"
        :column="col">
	
      </lb-column>
      
    </template>
  </el-table-column>
</template>

<script>
import LbRender from './lb-render'
import forced from './forced.js'
export default {
  name: 'LbColumn',
  props: {
    column: Object,
    headerAlign: String,
    align: String,
    fieldType: String,
    field: String,
    fieldAs: String,
    fun: String,
    expr: String,
    dataFormat: String,
    dataType: String,
  },
  components: {
    LbRender
  },
  methods: {
    setColumn () {
      
      if (this.column.type) {
        this.column.renderHeader = forced[this.column.type].renderHeader
        this.column.render = this.column.render || forced[this.column.type].renderCell
      }
      if (this.column.formatter) {
        this.column.render = (h, scope) => {
          return <div fieldType={ scope.row.fieldType } dataType={ obj.dataType }>{ scope.column.formatter(scope.row, scope.column, scope.row, scope.$index) }</div>
        }
      }
      if (!this.column.render) {
        this.column.render = (h, scope) => {
	  //debugger;
	  var obj = scope.row[scope.column.property];
          return <div fieldType={ obj.fieldType } dataType={ obj.dataType }>{ obj.value }</div>
        }
      }
    }
  },
  watch: {
    column: {
      handler () {
        this.setColumn()
      },
      immediate: true
    }
  }
}
</script>
<style>
.el-table td, .el-table th {
  padding: !important;
}
.el-table th {
  background:rgb(244, 244, 245) !important;
}
.el-table th div {
  display: !important;
  line-height: 12px !important;
  
}
.el-table .cell {
   padding-left: 2px !important;
   padding-right:2px !important;
}

.el-table .warning-row {
  background: rgb(240, 249, 235);
}

.el-table .success-row {
  background:#fbfbfb;
}


.linkcss a:link {
  color: #0065CE;
  text-decoration: underline !important;
 }

.linkcss a:visited {
  color: #0065CE;
  text-decoration: underline !important;
 }

 .linkcss a:hover {
   color: #FF0000;
   text-decoration: underline !important;
 }

 .linkcss a:active {
   background-color: transparent;
   color: #000000;
   text-decoration: underline;
 }
</style>