# xii的实习日记Day012

## 问题：render函数的使用

情景1:渲染自动一组件

情景2:包含较复杂的子组件

## 问题：renderHeader函数的使用

情景1:在table表头中加入下拉列表进行选择

```
<script>
import resourceIndex from '@/views/resource';
import {} from 'lt-service/settings/buyermanage';
import VersionUpdateList from '@/components/common/versionUpdateList';

export default {
  extends: resourceIndex,
  name: 'versionmanage',
  components: { VersionUpdateList },
  props: ['type', 'extra'],
  data() {
    return {
      name: 'versionmanage',
      getListXhr: '',
      postDeleteList: '',
      lang: 'zh-CN',
      langType: [
        {
          label: 'zh-CN',
          name: this.$t('global_zh_CN')
        },
        {
          label: 'en',
          name: this.$t('global_en')
        },
        {
          label: 'ru',
          name: this.$t('global_ru')
        }
      ],
      listConfigParams: {
        tableInfo: {
          tableColumn: [
            {
              title: this.$t('global_version'),
              key: 'name'
            },
            {
              title: 'Lang',
              key: 'lang',
              align: 'center',
              renderHeader: (h, params) => {
                return h(
                  'Select',
                  {
                    props: {
                      value: this.lang,
                      size: 'small'
                    },
                    on: {
                      'on-change': e => {
                        this.lang = e;
                        this.changeLanguage();
                      }
                    }
                  },
                  this.langType.map(item => {
                    return h('Option', {
                      props: {
                        value: item.label,
                        label: item.name
                      }
                    });
                  })
                );
              }
            }
          ]
        }
      }
    };
  },
  methods: {
    changeLanguage() {
      //切换语言
    }
  }
};
</script>

<style lang="less" scoped>
.versionmanage-page {
  .new-version {
    width: 122px;
    height: 34px;
    border-radius: 2px;
    letter-spacing: 2px;
    font-size: 14px;
    text-align: center;
    line-height: 14px;
    background: #0047c7;
    letter-spacing: 2px;
    color: #ffffff;
    font-weight: bold;
  }
}
</style>

<i18n>
{
  "zh-CN": {
    "release-time": "发布时间：{time}",
    "update-version": "更新版本"
  },
  "en": {
    "release-time": "Release Time：{time}",
    "update-version": "Update Version"
  },
  "ru": {
    "release-time": "",
    "update-version": ""
  }
}
</i18n>

```



```
//非jsx写法
 renderHeader: (h, params) => {
            return h(
              'Select',
              {
                props: {
                  value: this.lang,
                  size: 'small'
                },
                on: {
                  'on-change': e => {
                    this.lang = e;
                    this.changeLanguage();
                  }
                }
              },
              this.langType.map(item => {
                return h('Option', {
                  props: {
                    value: item.label,
                    label: item.name
                  }
                });
              })
            );
          },
          
//jsx写法
  renderHeader: (h, params) => {
            return (
              <Select
                vModel={this.lang}
                vOn:on-change={e => {
                  this.changeLanguage();
                }}
              >
                {this.langType.map(item => {
                  return <Option value={item.label} label={item.name}></Option>;
                })}
              </Select>
            );
          },
```



```
<template>
  <div class="versionmanage-page">
    <button class="new-version">{{ $t('global_update_version') }}</button>
    <div class="versionmanage-content">
      <Table :columns="columns1" :data="data1"></Table>
    </div>
  </div>
</template>

<script>
import { getSoftWare, deleteSoftWare } from 'lt-service/settings/download';
import softwareConfigurationZh from '@/assets/software_configuration_zh.png';
import softwareConfigurationEn from '@/assets/software_configuration_en.png';
import Store from 'store';
import VersionUpdateList from '@/components/common/versionUpdateList';

export default {
  components: {},
  props: ['type', 'extra'],
  data() {
    return {
      lang: 'zh-CN',
      langType: [
        {
          label: 'zh-CN',
          name: this.$t('global_zh_CN')
        },
        {
          label: 'en',
          name: this.$t('global_en')
        },
        {
          label: 'ru',
          name: this.$t('global_ru')
        }
      ],
      columns1: [
        {
          title: this.$t('global_version'),
          key: 'name',
          render: (h, { row }) => {
            return (
              <div class="version-info">
                <h2>{row.title}</h2>
                <p class="release-time">{this.$t('release-time', { time: row.createdAt })}</p>
                <div>
                  <span
                    class="icon iconfont"
                    style={{ marginRight: '16px', cursor: 'pointer' }}
                    vOn:click={() => this.editInfo(row.id)}
                  >
                    &#xe727;
                  </span>
                  <span class="icon iconfont" style={{ cursor: 'pointer' }} vOn:click={() => this.delInfo(row.id)}>
                    &#xe72c;
                  </span>
                </div>
              </div>
            );
          }
        },
        {
          title: 'Lang',
          key: 'lang',
          align: 'center',
          renderHeader: (h, params) => {
            return (
              <Select
                vModel={this.lang}
                vOn:on-change={e => {
                  this.changeLanguage();
                }}
              >
                {this.langType.map(item => {
                  return <Option value={item.label} label={item.name}></Option>;
                })}
              </Select>
            );
          },
          render: (h, params) => {
            return h(VersionUpdateList, {
              props: {
                params: params.row.data
              }
            });
          }
        }
      ],
      data1: [
        {
          name: 'John Brown',
          lang: { label: 'zh-CN' }
        },
        {
          name: 'Jim Green',
          lang: { label: 'zh-CN' }
        },
        {
          name: 'Joe Black',
          lang: { label: 'zh-CN' }
        }
      ]
    };
  },
  methods: {
    changeLanguage() {
      //切换语言
    },
    editInfo() {},
    delInfo() {}
  }
};
</script>

<style lang="less" scoped>

  .new-version {
    width: 122px;
    height: 34px;
    border-radius: 2px;
    letter-spacing: 2px;
    font-size: 14px;
    text-align: center;
    line-height: 14px;
    background: #0047c7;
    letter-spacing: 2px;
    color: #ffffff;
    font-weight: bold;
  }
  .release-time {
    font-size: 14px;
    color: #4f4f4f;
  }
</style>

<i18n>
{
  "zh-CN": {
    "release-time": "发布时间：{time}",
    "update-version": "更新版本"
  },
  "en": {
    "release-time": "Release Time：{time}",
    "update-version": "Update Version"
  },
  "ru": {
    "release-time": "",
    "update-version": ""
  }
}
</i18n>

```

