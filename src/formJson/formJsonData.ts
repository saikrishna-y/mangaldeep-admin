export const MastersJSON = () => {
  const template = [
    {
      title: '/masters/deities/',
      addModal: {
        children: [
          {
            type: 'text',
            label: 'Name',
            name: 'name'
          },
          {
            type: 'img',
            name: 'Image',
            children: [
              {
                type: 'chooseFromUploadedImages',
                name: 'Choose From Uploaded Images',
                props: {
                  hasImageModules: true,
                  hasImageModulesData: {
                    data: [
                      {
                        label: 'Deities',
                        key: 1,
                        value: 1
                      }
                    ]
                  },
                  imageModulesOptions: [],
                  hasLocale: true,
                  hasLocaleData: {
                    data: [
                      {
                        label: 'Australia-Australia-Bengali(AUS-AUS-BGL)',
                        key: 1,
                        value: 1
                      }
                    ]
                  },
                  hasIsCustomisedGod: true
                }
              }
            ]
          },
          {
            type: 'multiSelectTable',
            label: 'Locales',
            name: 'locales_id'
          }
        ]
      }
    },
    {
      title: '/masters/festivals/',
      addModal: {
        children: [
          {
            type: 'text',
            label: 'Name',
            name: 'name'
          },
          {
            type: 'img',
            label: 'Image',
            children: [
              {
                type: 'chooseFromUploadedImages',
                name: 'Choose From Uploaded Images',
                props: {
                  hasImageModules: true,
                  hasImageModulesData: {
                    data: [
                      {
                        label: 'Deities',
                        key: 1,
                        value: 1
                      }
                    ]
                  },
                  hasLocale: true,
                  hasLocaleData: {
                    data: [
                      {
                        label: 'Australia-Australia-Bengali(AUS-AUS-BGL)',
                        key: 1,
                        value: 1
                      }
                    ]
                  },
                  hasIsCustomisedGod: true
                }
              }
            ]
          },
          {
            type: 'multiSelectTable',
            label: 'Locales',
            name: 'locales'
          }
        ]
      }
    },
    {
      title: '/masters/locations/',
      addModal: {
        children: [
          {
            type: 'select',
            label: 'Country',
            name: 'country_id',
            data: [
              {
                label: 'India',
                key: 1,
                value: 1
              }
            ]
          },
          {
            type: 'text',
            label: 'Name',
            name: 'name'
          },
          {
            type: 'text',
            label: 'Code',
            name: 'location_code'
          },
          {
            type: 'select',
            label: 'Zone',
            name: 'zone_id',
            data: [
              {
                label: 'North',
                key: 1,
                value: 1
              },
              {
                label: 'South',
                key: 2,
                value: 2
              }
            ]
          },
          {
            type: 'select',
            label: 'Panchang Time Zone',
            name: 'panchang_id',
            data: [
              {
                label: 'Full Moon',
                key: 1,
                value: 1
              },
              {
                label: 'No Moon',
                key: 2,
                value: 2
              }
            ]
          }
        ]
      }
    },
    {
      title: '/masters/languages/',
      addModal: {
        children: [
          {
            type: 'text',
            label: 'Name',
            name: 'name'
          },
          {
            type: 'text',
            label: 'Code',
            name: 'language_code'
          }
        ]
      }
    },
    {
      title: '/masters/countries/',
      addModal: {
        children: [
          {
            type: 'text',
            label: 'Name',
            name: 'name'
          },
          {
            type: 'text',
            label: 'Code',
            name: 'country_code'
          },
          {
            type: 'checkbox',
            label: 'Is Default',
            name: 'isDefault'
          },
          {
            type: 'checkbox',
            label: 'Is Active',
            name: 'isActive'
          }
        ]
      }
    },
    {
      title: '/masters/locales/',
      addModal: {
        children: [
          {
            type: 'select',
            label: 'Countries',
            name: 'country_id',
            data: [
              {
                label: 'India',
                key: 1,
                value: 1
              }
            ]
          },
          {
            type: 'select',
            label: 'Locations',
            name: 'location_id',
            data: [
              {
                label: 'Andhra Pradesh',
                key: 1,
                value: 1
              }
            ]
          },
          {
            type: 'select',
            label: 'Languages',
            name: 'language_id',
            data: [
              {
                label: 'English',
                key: 1,
                value: 1
              },
              {
                label: 'Telugu',
                key: 3,
                value: 3
              }
            ]
          },
          {
            type: 'text',
            label: 'Locale Name',
            name: 'name'
          }
        ]
      }
    },
    {
      title: '/masters/devotionalSongs/artists/',
      addModal: {
        children: [
          {
            type: 'text',
            label: 'Name',
            name: 'name'
          },
          {
            type: 'img',
            label: 'Image',
            children: [
              {
                type: 'chooseFromUploadedImages',
                name: 'Choose From Uploaded Images',
                hasChooseUploadImages: true,
                props: {
                  hasImageModules: true,
                  hasImageModulesData: {
                    data: [
                      {
                        id: 1,
                        value: 'Deities',
                        label: 'Deities',
                        images: [
                          {
                            id: 1,
                            img: 'http://localhost:3000/abe6d79f-8eb0-4d2b-ba4d-3bb282f5021a',
                            locale: [1, 2]
                          },
                          {
                            id: 2,
                            img: 'http://localhost:3000/c7e07e59-4199-49b7-a8ab-e74f702a37d1',
                            locale: [3, 4]
                          }
                        ]
                      },
                      {
                        id: 2,
                        value: 'Festivals',
                        label: 'Festivals',
                        images: [
                          {
                            id: 1,
                            img: 'http://localhost:3000/abe6d79f-8eb0-4d2b-ba4d-3bb282f5021a'
                          },
                          {
                            id: 2,
                            img: 'http://localhost:3000/c7e07e59-4199-49b7-a8ab-e74f702a37d1'
                          }
                        ]
                      }
                    ]
                  },
                  hasLocale: true,
                  hasLocaleData: {
                    data: [
                      {
                        id: 1,
                        value: 1,
                        key: 1,
                        label: 'Australia-Australia-Bengali'
                      },
                      {
                        id: 2,
                        value: 2,
                        key: 2,
                        label: 'Australia-Australia-English'
                      },
                      {
                        id: 3,
                        value: 3,
                        key: 3,
                        label: 'Australia-Australia-Gujarati'
                      }
                    ]
                  },
                  hasIsCustomisedGod: false
                }
              }
            ]
          },
          {
            type: 'multiSelectTable',
            label: 'Locales',
            name: 'locales'
          }
        ]
      }
    },
    {
      title: '/masters/devotionalSongs/albums/',
      addModal: {
        children: [
          {
            type: 'text',
            name: 'Name'
          },
          {
            type: 'img',
            name: 'Image',
            children: [
              {
                type: 'chooseFromUploadedImages',
                name: 'Choose From Uploaded Images',
                props: {
                  hasImageModules: true,
                  hasImageModulesData: {
                    data: []
                  },
                  hasLocale: true,
                  hasLocaleData: {
                    data: []
                  },
                  hasIsCustomisedGod: false
                }
              }
            ]
          },
          {
            type: 'multiSelectTable',
            name: 'Locales'
          }
        ]
      }
    },
    {
      title: '/masters/editorials/category/',
      addModal: {
        children: [
          {
            type: 'text',
            label: 'Name',
            name: 'name'
          },
          {
            type: 'text',
            label: 'Display Order',
            name: 'display_order'
          },
          {
            type: 'img',
            name: 'Image',
            children: [
              {
                type: 'chooseFromUploadedImages',
                name: 'Choose From Uploaded Images',
                props: {
                  hasImageModules: true,
                  hasImageModulesData: {
                    data: [
                      {
                        label: 'Deities',
                        key: 1,
                        value: 1
                      }
                    ]
                  },
                  hasLocale: true,
                  hasLocaleData: {
                    data: [
                      {
                        label: 'Australia-Australia-Bengali(AUS-AUS-BGL)',
                        key: 1,
                        value: 1
                      }
                    ]
                  },
                  hasIsCustomisedGod: false
                }
              }
            ]
          },
          {
            type: 'multiSelectTable',
            label: 'Locales',
            name: 'locales'
          }
        ]
      }
    },
    {
      title: '/masters/editorials/subCategory/',
      addModal: {
        children: [
          {
            type: 'select',
            label: 'Category',
            name: 'category_id',
            data: []
          },
          {
            type: 'text',
            label: 'Sub Category',
            name: 'name'
          },
          {
            type: 'text',
            label: 'Display Order',
            name: 'display_order'
          }
        ]
      }
    },
    {
      title: '/masters/modules/moduleStatus/',
      addModal: {
        children: [
          {
            type: 'select',
            label: 'Module',
            name: 'module_name',
            data: [
              {
                label: 'MangaldeepGeets',
                key: 1,
                value: 'MangaldeepGeets'
              },
              {
                label: 'MangaldeepGeetDynamic',
                key: 1,
                value: 'MangaldeepGeetDynamic'
              }
            ]
          },
          {
            type: 'multiSelectTable',
            label: 'Locales',
            name: 'locales'
          }
        ]
      }
    },
    {
      title: '/masters/modules/dynamicHeader/',
      addModal: {
        children: [
          {
            type: 'text',
            label: 'Name',
            name: 'name'
          },
          {
            type: 'select',
            label: 'Module',
            name: 'module_name',
            data: [
              {
                label: 'MangaldeepGeets',
                key: 1,
                value: 'MangaldeepGeets'
              },
              {
                label: 'MangaldeepGeetDynamic',
                key: 1,
                value: 'MangaldeepGeetDynamic'
              }
            ]
          },
          {
            type: 'multiSelectTable',
            label: 'Locales',
            name: 'locales'
          }
        ]
      }
    },
    {
      title: '/masters/modules/globalSearchModules/',
      addModal: {
        children: [
          {
            type: 'text',
            label: 'Module Name',
            name: 'module_name'
          },
          {
            type: 'text',
            label: 'Display Order',
            name: 'display_order'
          }
        ]
      }
    },
    {
      title: '/masters/templeLocator/',
      addModal: {
        children: [
          {
            type: 'select',
            label: 'Deity',
            name: 'deity_id',
            data: [
              {
                label: 'Ananta(GBR-GBR-ENG,NPL-NPL-ENG,USA-USA-ENG)',
                key: 3,
                value: 3
              },
              {
                label: 'Anjaneya(IND-KL-ENG,CAN-CAN-ENG)',
                key: 1,
                value: 2
              }
            ]
          },
          {
            type: 'text',
            label: 'Keywords',
            name: 'keyword'
          },
          {
            type: 'multiSelectTable',
            label: 'Locales',
            name: 'locales'
          }
        ]
      }
    },
    {
      title: '/masters/pandals/',
      addModal: {
        children: [
          {
            type: 'select',
            label: 'Deity',
            name: 'deity_id',
            data: [
              {
                label: 'Ananta(GBR-GBR-ENG,NPL-NPL-ENG,USA-USA-ENG)',
                key: 1,
                value: 1
              },
              {
                label: 'Anjaneya(IND-KL-ENG,CAN-CAN-ENG)',
                key: 1,
                value: 2
              }
            ]
          },
          {
            type: 'text',
            label: 'Name',
            name: 'name'
          },
          {
            type: 'multiSelectTable',
            label: 'Locales',
            name: 'locales'
          },
          {
            type: 'text',
            label: 'Latitude',
            name: 'latitude'
          },
          {
            type: 'text',
            label: 'Longitude',
            name: 'longitude'
          },
          {
            type: 'img',
            name: 'Image',
            children: [
              {
                type: 'chooseFromUploadedImages',
                name: 'Choose From Uploaded Images',
                props: {
                  hasImageModules: true,
                  hasImageModulesData: {
                    data: []
                  },
                  hasLocale: false,
                  hasIsCustomisedGod: false
                }
              }
            ]
          },
          {
            type: 'text',
            label: 'Description',
            name: 'description'
          },
          {
            type: 'text',
            label: 'Address',
            name: 'address'
          },
          {
            type: 'text',
            label: 'Pendal Url',
            name: 'pandal_url'
          }
        ]
      }
    },
    {
      title: '/masters/feedbackCategory/',
      addModal: {
        children: [
          {
            type: 'text',
            label: 'Name',
            name: 'name'
          },
          {
            type: 'select',
            label: 'Language',
            name: 'language_id',
            data: [
              {
                label: 'English',
                name: 1
              },
              {
                label: 'Telugu',
                name: 2
              }
            ]
          },
          {
            type: 'text',
            label: 'Display Order',
            name: 'display_order',
            valueType: 'number'
          }
        ]
      }
    },
    {
      title: '/masters/prasadCategory/',
      addModal: {
        children: [
          {
            type: 'text',
            label: 'Name',
            name: 'name'
          },
          {
            type: 'select',
            label: 'Language',
            name: 'language_id',
            data: [
              {
                label: 'English',
                name: 1
              },
              {
                label: 'Telugu',
                name: 2
              }
            ]
          },
          {
            type: 'text',
            label: 'Display Order',
            name: 'display_order'
          }
        ]
      }
    },
    {
      title: '/masters/mangaldeepGeetCategory/',
      addModal: {
        children: [
          {
            type: 'text',
            label: 'Name',
            name: 'name'
          },
          {
            type: 'select',
            label: 'Language',
            name: 'language_id',
            data: [
              {
                label: 'Kannada',
                value: 1,
                key: 1
              },
              {
                label: 'Telugu',
                value: 2,
                key: 1
              }
            ]
          },
          {
            type: 'text',
            label: 'Display Order',
            name: 'display_order'
          }
        ]
      }
    },
    {
      title: '/masters/icon/',
      addModal: {
        children: [
          {
            type: 'img',
            name: 'Image',
            children: [
              {
                type: 'chooseFromUploadedImages',
                name: 'Choose From Uploaded Images',
                props: {
                  hasImageModules: false,
                  hasImageModulesData: {
                    data: []
                  },
                  hasLocale: false,
                  hasLocaleData: {
                    data: []
                  },
                  hasIsCustomisedGod: false
                }
              }
            ]
          },
          {
            type: 'multiSelectTable',
            label: 'Locales',
            name: 'locales'
          }
        ]
      }
    },
    {
      title: '/masters/releaseManagement/',
      addModal: {
        children: [
          {
            type: 'text',
            label: 'Version Number',
            name: 'version_number'
          },
          {
            type: 'text',
            label: 'Build Number',
            name: 'build_number'
          },
          {
            type: 'text',
            label: 'Version Date',
            name: 'version_date'
          },
          {
            type: 'select',
            label: 'Device Type',
            name: 'device_type_id',
            data: [
              {
                label: 'IOS',
                key: 1,
                value: 1
              },
              {
                label: 'Android',
                key: 1,
                value: 2
              }
            ]
          },
          {
            type: 'checkbox',
            label: 'Is Backward Compatible',
            name: 'is_backward_compatible'
          },
          {
            type: 'text',
            label: 'Pop Up Count',
            name: 'popup_count'
          }
        ]
      }
    }
  ]

  return JSON.stringify(template)
}

export const Modules = () => {
  const template = [
    {
      title: '/modules/devotionalSong/devotionalSongs/',
      addModal: {
        children: [
          {
            type: 'text',
            label: 'Title',
            name: 'title'
          },
          {
            type: 'text',
            label: 'Name',
            name: 'name'
          },
          {
            type: 'text',
            label: 'Description To Share',
            name: 'description'
          },
          {
            type: 'text',
            label: 'Audio URL',
            name: 'audrio_url'
          },
          {
            type: 'multiSelectTable',
            label: 'Deity',
            name: 'deities'
          },
          {
            type: 'select',
            label: 'Album',
            name: 'album_id'
          },
          {
            type: 'checkbox',
            label: 'Is NewSong',
            name: 'isNewSongs'
          },
          {
            type: 'checkbox',
            label: 'Is Featured',
            name: 'isFeatured'
          },
          {
            type: 'checkbox',
            label: 'Is Famous Song',
            name: 'isFamousSong'
          },
          {
            type: 'multiSelectTable',
            label: 'Locales',
            name: 'locales'
          },
          {
            type: 'paragraph',
            label: 'Upload Song',
            name: 'title'
          },
          {
            type: 'audio',
            label: ''
          },
          {
            type: 'multiSelectTable',
            label: 'Artist',
            name: 'artists'
          },
          {
            type: 'img',
            label: 'Image',
            children: [
              {
                type: 'chooseFromUploadedImages',
                label: 'Choose From Uploaded Images',
                hasChooseUploadImages: false,
                props: {
                  hasImageModules: true,
                  hasImageModulesData: {
                    data: []
                  },
                  hasLocale: true,
                  hasLocaleData: {
                    data: []
                  },
                  hasIsCustomisedGod: false
                }
              }
            ]
          }
        ]
      }
    },
    {
      title: '/modules/devotionalSong/mostPlayedSong/',
      addModal: {
        children: [
          {
            type: 'select',
            label: 'Locales',
            name: 'locales'
          },
          {
            type: 'multiSelectTable',
            label: 'Most Played Songs',
            name: 'songs'
          }
        ]
      }
    },
    {
      title: '/modules/buyMangaldeepStore/',
      addModal: {
        children: [
          {
            type: 'text',
            label: 'Name',
            name: 'name'
          },
          {
            type: 'text',
            label: 'Disclaimer Text',
            name: 'disclaimer'
          },
          {
            type: 'img',
            label: 'Image',
            children: [
              {
                type: 'chooseFromUploadedImages',
                label: 'Choose From Uploaded Images',
                props: {
                  hasImageModules: false,
                  hasLocale: false,
                  hasIsCustomisedGod: false
                }
              }
            ]
          },
          {
            type: 'text',
            label: 'Store URL',
            name: 'store_url'
          },
          {
            type: 'text',
            label: 'Order ID ',
            name: 'order_id'
          },
          {
            type: 'multiSelectTable',
            label: 'Locales',
            name: 'locales'
          }
        ]
      }
    },
    {
      title: '/modules/puja/pujas/',
      addModal: {
        children: [
          {
            type: 'text',
            label: 'Name',
            name: 'name'
          },
          {
            type: 'multiSelectTable',
            label: 'Week Day',
            name: 'weekday'
          },
          {
            type: 'text',
            label: 'Description',
            name: 'description'
          },
          {
            type: 'text',
            label: 'Description To Share',
            name: 'description_to_share'
          },
          {
            type: 'img',
            label: 'Image',
            children: [
              {
                type: 'chooseFromUploadedImages',
                label: 'Choose From Uploaded Images',
                props: {
                  hasImageModules: true,
                  hasImageModulesData: {
                    data: []
                  },
                  hasLocale: true,
                  hasLocaleData: {
                    data: []
                  },
                  hasIsCustomisedGod: true
                }
              }
            ]
          },
          {
            type: 'text',
            label: 'Background',
            name: 'background'
          },
          {
            type: 'text',
            label: 'Timings',
            name: 'timings'
          },
          {
            type: 'multiSelectTable',
            label: 'Puja Type',
            name: 'puja_type'
          },
          {
            type: 'multiSelectTable',
            label: 'Deity',
            name: 'deities'
          },
          {
            type: 'multiSelectTable',
            label: 'Festival',
            name: 'festivals'
          },
          {
            type: 'multiSelectTable',
            label: 'Locales',
            name: 'locales'
          },
          {
            type: 'paragraph',
            label: 'Procedure',
            name: 'procedure'
          },
          {
            type: 'paragraph',
            label: 'Puja Material & Qty',
            name: 'pujaMaterial'
          },
          {
            type: 'button',
            label: 'Add Puja Material'
          }
        ]
      }
    },
    {
      title: '/modules/puja/sankalps/',
      addModal: {
        children: [
          {
            type: 'text',
            label: 'Sankalp Text',
            name: 'text'
          },
          {
            type: 'multiSelectTable',
            label: 'Locales',
            name: 'locales'
          }
        ]
      }
    },
    {
      title: '/modules/panchang/dainikPanchang/',
      addModal: {
        children: [
          {
            type: 'text',
            label: 'Panchang Date',
            name: 'date'
          },
          {
            type: 'checkbox',
            label: 'Is Festival',
            name: 'is_festival'
          },
          {
            type: 'checkbox',
            label: 'Is Purnima',
            name: 'is_purnima'
          },
          {
            type: 'checkbox',
            label: 'Is Amavasya',
            name: 'is_amavasya'
          },
          {
            type: 'text',
            label: 'Day',
            name: 'day'
          },
          {
            type: 'text',
            label: 'Karna',
            name: 'karna'
          },
          {
            type: 'text',
            label: 'Yoga',
            name: 'yoga'
          },
          {
            type: 'text',
            label: 'Nakshatra',
            name: 'nakshatra'
          },
          {
            type: 'text',
            label: 'Sunrise',
            name: 'sunrise'
          },
          {
            type: 'text',
            label: 'Sunset',
            name: 'sunset'
          },
          {
            type: 'text',
            label: 'Moonrise',
            name: 'moonrise'
          },
          {
            type: 'text',
            label: 'Moonset',
            name: 'moonset'
          },
          {
            type: 'text',
            label: 'Ayana',
            name: 'ayana'
          },
          {
            type: 'text',
            label: 'Masa',
            name: 'masa'
          },
          {
            type: 'text',
            label: 'Rutu',
            name: 'rutu'
          },
          {
            type: 'text',
            label: 'Samvatsara',
            name: 'samvatsara'
          },
          {
            type: 'text',
            label: 'Saura Masa',
            name: 'saura_masa'
          },
          {
            type: 'text',
            label: 'Gulikakala',
            name: 'gulikakala'
          },
          {
            type: 'text',
            label: 'Rahukala',
            name: 'rahukal'
          },
          {
            type: 'text',
            label: 'Yamagandakala',
            name: 'yamagandakala'
          },
          {
            type: 'multiSelectTable',
            label: 'Locales',
            name: 'locales'
          },
          {
            type: 'text',
            label: 'Summary',
            name: 'summary'
          }
        ]
      }
    },
    {
      title: '/modules/panchang/festivalCalendar/',
      addModal: {
        children: [
          {
            type: 'select',
            label: 'Festival',
            name: 'festival_id',
            data: [
              {
                label: 'Diwali',
                key: 1,
                value: 1
              },
              {
                label: 'Dussehra',
                key: 2,
                value: 2
              }
            ]
          },
          {
            type: 'text',
            label: 'Festival Date',
            name: 'date'
          },
          {
            type: 'multiSelectTable',
            label: 'Locales',
            name: 'locales'
          }
        ]
      }
    },
    {
      title: '/modules/panchang/panchangFileUpload/',
      addModal: {
        children: [
          {
            type: 'select',
            label: 'Language',
            name: 'language_id',
            data: [
              {
                label: 'Kannada',
                key: 1,
                value: 1
              },
              {
                label: 'Telugu',
                key: 2,
                value: 2
              }
            ]
          },
          {
            type: 'select',
            label: 'Location',
            name: 'location_id',
            data: [
              {
                label: 'Nellore',
                key: 1,
                value: 1
              },
              {
                label: 'Bangalore',
                key: 2,
                value: 2
              }
            ]
          },
          {
            type: 'select',
            label: 'Locales',
            name: 'locale_id',
            data: [
              {
                label: 'Australia',
                key: 1,
                value: 1
              },
              {
                label: 'Kadapa',
                key: 2,
                value: 2
              }
            ]
          },
          {
            type: 'fileUpload',
            label: 'Locales',
            name: 'file_url'
          },
          {
            type: 'button',
            label: 'Upload Data',
            name: 'file_url'
          }
        ]
      }
    },
    {
      title: '/modules/mantras/mantras/',
      addModal: {
        children: [
          {
            type: 'select',
            label: 'Deity',
            name: 'deity_id',
            data: [
              {
                label: 'Ananta',
                key: 2,
                value: 2
              }
            ]
          },
          {
            type: 'text',
            label: 'Name',
            name: 'name'
          },
          {
            type: 'text',
            label: 'Description Text',
            name: 'description'
          },
          {
            type: 'text',
            label: 'Mantra Content',
            name: 'content'
          },
          {
            type: 'text',
            label: 'Pronunciation',
            name: 'pronunciation'
          },
          {
            type: 'text',
            label: 'URL',
            name: 'url'
          },
          {
            type: 'text',
            label: 'Description To Share',
            name: 'description_to_share'
          },
          {
            type: 'multiSelectTable',
            label: 'Locales',
            name: 'locales'
          },
          {
            type: 'audio',
            label: 'Upload Song',
            name: 'audio_url'
          }
        ]
      }
    },
    {
      title: '/modules/mantras/shlokas/',
      addModal: {
        children: [
          {
            type: 'select',
            label: 'Deity',
            name: 'deity_id',
            data: [
              {
                label: 'Ananta',
                key: 2,
                value: 2
              }
            ]
          },
          {
            type: 'text',
            label: 'Name',
            name: 'name'
          },
          {
            type: 'text',
            label: 'Description',
            name: 'description'
          },
          {
            type: 'img',
            label: 'Image',
            children: [
              {
                type: 'chooseFromUploadedImages',
                name: 'Choose From Uploaded Images',
                props: {
                  hasImageModules: true,
                  hasImageModulesData: {
                    data: [
                      {
                        label: 'Deities',
                        key: 1,
                        value: 1
                      }
                    ]
                  },
                  hasLocale: true,
                  hasLocaleData: {
                    data: [
                      {
                        label: 'Australia-Australia-Bengali(AUS-AUS-BGL)',
                        key: 1,
                        value: 1
                      }
                    ]
                  },
                  hasIsCustomisedGod: false
                }
              }
            ]
          },
          {
            type: 'text',
            label: 'Shloka Content',
            name: 'content'
          },
          {
            type: 'text',
            label: 'Pronunciation ',
            name: 'pronunciation'
          },
          {
            type: 'text',
            label: 'Description To Share ',
            name: 'description_to_share'
          },
          {
            type: 'multiSelectTable',
            label: 'Locales',
            name: 'locales'
          },
          {
            type: 'audio',
            label: 'Upload Song',
            name: 'audio_url'
          }
        ]
      }
    },
    {
      title: '/modules/mantras/ashtothras/',
      addModal: {
        children: [
          {
            type: 'select',
            label: 'Deity',
            name: 'deity_id',
            data: [
              {
                label: 'Ananta',
                key: 2,
                value: 2
              }
            ]
          },
          {
            type: 'text',
            label: 'Name',
            name: 'name'
          },
          {
            type: 'text',
            label: 'Description To Share',
            name: 'description_to_share'
          },
          {
            type: 'multiSelectTable',
            label: 'Locales',
            name: 'locales'
          },
          {
            type: 'text',
            label: 'Copy & Paste the Ashtothra Names',
            name: ''
          },
          {
            type: 'paragraph',
            label: 'Note : Copy & paste all Ashtothra Names. Please separate them with line break',
            name: ''
          },
          {
            type: 'button',
            label: 'Auto Fill Ashtothra Names ',
            name: ''
          },
          {
            type: 'paragraph',
            label: 'Ashtothra Names',
            name: ''
          },
          {
            type: 'button',
            label: 'Add Ashtothra Name',
            name: ''
          }
        ]
      }
    },
    {
      title: '/modules/mantras/chalisas/',
      addModal: {
        children: [
          {
            type: 'select',
            label: 'Deity',
            name: 'deity_id',
            data: [
              {
                label: 'Ananta',
                key: 2,
                value: 2
              }
            ]
          },
          {
            type: 'text',
            label: 'Name',
            name: 'name'
          },
          {
            type: 'img',
            name: 'Image',
            children: [
              {
                type: 'chooseFromUploadedImages',
                name: 'Choose From Uploaded Images',
                props: {
                  hasImageModules: true,
                  hasImageModulesData: {
                    data: [
                      {
                        label: 'Deities',
                        key: 1,
                        value: 1
                      }
                    ]
                  },
                  hasLocale: true,
                  hasLocaleData: {
                    data: [
                      {
                        label: 'Australia-Australia-Bengali(AUS-AUS-BGL)',
                        key: 1,
                        value: 1
                      }
                    ]
                  },
                  hasIsCustomisedGod: false
                }
              }
            ]
          },
          {
            type: 'text',
            label: 'Description To Share',
            name: 'description_to_share'
          },
          {
            type: 'multiSelectTable',
            label: 'Locales',
            name: 'locales'
          },
          {
            type: 'paragraph',
            label: 'Chalisa Content'
          },
          {
            type: 'editor',
            label: 'Editor',
            name: 'content'
          }
        ]
      }
    },
    {
      title: '/modules/mantras/kavachas/',
      addModal: {
        children: [
          {
            type: 'select',
            label: 'Deity',
            name: 'deity_id',
            data: [
              {
                label: 'Ananta',
                key: 2,
                value: 2
              }
            ]
          },
          {
            type: 'text',
            label: 'Name',
            name: 'name'
          },
          {
            type: 'img',
            name: 'Image',
            children: [
              {
                type: 'chooseFromUploadedImages',
                name: 'Choose From Uploaded Images',
                props: {
                  hasImageModules: true,
                  hasImageModulesData: {
                    data: [
                      {
                        label: 'Deities',
                        key: 1,
                        value: 1
                      }
                    ]
                  },
                  hasLocale: true,
                  hasLocaleData: {
                    data: [
                      {
                        label: 'Australia-Australia-Bengali(AUS-AUS-BGL)',
                        key: 1,
                        value: 1
                      }
                    ]
                  },
                  hasIsCustomisedGod: false
                }
              }
            ]
          },
          {
            type: 'multiSelectTable',
            label: 'Locales',
            name: 'locales'
          },
          {
            type: 'paragraph',
            label: 'Kavacha Content',
            name: 'content'
          },
          {
            type: 'editor',
            label: 'Editor'
          }
        ]
      }
    },
    {
      title: '/modules/geetaQuotes/geetaQuoteAudio/',
      addModal: {
        children: [
          {
            type: 'text',
            label: 'Name',
            name: 'name'
          },
          {
            type: 'select',
            label: 'Audio Language',
            name: 'audio_language_id',
            data: [
              {
                label: 'English',
                key: 1,
                value: 1
              },
              {
                label: 'Telugu',
                key: 2,
                value: 2
              },
              {
                label: 'Hinid',
                key: 3,
                value: 3
              }
            ]
          },
          {
            type: 'audio',
            label: 'Upload Song',
            name: 'audio_url'
          },
          {
            type: 'multiSelectTable',
            label: 'Geeta Quotes',
            name: 'geeta_quotes'
          },
          {
            type: 'multiSelectTable',
            label: 'Languages',
            name: 'languages'
          }
        ]
      }
    },
    {
      title: '/modules/carousels/templeRaaga/',
      addModal: {
        children: [
          {
            type: 'text',
            label: 'Name',
            name: 'name'
          },
          {
            type: 'text',
            label: 'Artist Name',
            name: 'artist_name'
          },
          {
            type: 'text',
            label: 'Display Order',
            name: 'display_order'
          },
          {
            type: 'checkbox',
            label: 'Is Android',
            name: 'is_android'
          },
          {
            type: 'checkbox',
            label: 'Is IOS',
            name: 'is_ios'
          },
          {
            type: 'text',
            label: 'URL',
            name: 'url'
          },
          {
            type: 'text',
            label: 'Duration',
            name: 'duration'
          },
          {
            type: 'multiSelectTable',
            label: 'Locales',
            name: 'locales'
          },
          {
            type: 'img',
            label: 'Image',
            name: 'image_url'
          },
          {
            type: 'paragraph',
            name: 'Description'
          },
          {
            type: 'editor',
            label: 'Editor',
            name: 'description'
          }
        ]
      }
    },
    {
      title: '/modules/carousels/liveStreaming/',
      addModal: {
        children: [
          {
            type: 'text',
            label: 'Name',
            name: 'name'
          },
          {
            type: 'checkbox',
            label: 'Is Video',
            name: 'is_video'
          },
          {
            type: 'text',
            label: 'Display Order',
            name: 'display_order'
          },
          {
            type: 'checkbox',
            label: 'Is Android',
            name: 'is_android'
          },
          {
            type: 'checkbox',
            label: 'Is IOS',
            name: 'is_ios'
          },
          {
            type: 'text',
            label: 'Video URL',
            name: 'video_url'
          },
          {
            type: 'text',
            label: 'Duration',
            name: 'duration'
          },
          {
            type: 'img',
            label: 'Image',
            name: 'image'
          },
          {
            type: 'date',
            label: 'Date & Time',
            name: 'date'
          },
          {
            type: 'multiSelectTable',
            label: 'Locales',
            name: 'locales'
          }
        ]
      }
    },
    {
      title: '/modules/carousels/mangaldeepGeet/',
      addModal: {
        children: [
          {
            type: 'text',
            label: 'Name',
            name: 'name'
          },
          {
            type: 'text',
            label: 'Short Description',
            name: 'short_desc'
          },
          {
            type: 'select',
            label: 'Deity',
            name: 'deity_id'
          },
          {
            type: 'checkbox',
            label: 'Is Second Carousel',
            name: 'is_second_carousel'
          },
          {
            type: 'checkbox',
            label: 'Is Android',
            name: 'is_android'
          },
          {
            type: 'checkbox',
            label: 'Is IOS',
            name: 'is_ios'
          },
          {
            type: 'text',
            label: 'URL',
            name: 'url'
          },
          {
            type: 'text',
            label: 'Duration',
            name: 'duration'
          },
          {
            type: 'select',
            label: 'Mangaldeep Geet Category',
            name: 'mangaldeep_geet_cat_id'
          },
          {
            type: 'text',
            label: 'Display Order',
            name: 'display_order'
          },
          {
            type: 'multiSelectTable',
            label: 'Locales',
            name: 'locales'
          },
          {
            type: 'img',
            label: 'Image',
            name: 'image_url'
          },
          {
            type: 'Song Description',
            label: 'Song Description',
            name: 'song_desc'
          }
        ]
      }
    },
    {
      title: '/modules/carousels/dynamicBanner/',
      addModal: {
        children: [
          {
            type: 'select',
            label: 'Module Name',
            name: 'module_name_id'
          },
          {
            type: 'text',
            label: 'Title',
            name: 'title'
          },
          {
            type: 'text',
            label: 'Display Order',
            name: 'display_order'
          },
          {
            type: 'text',
            label: 'Display Title',
            name: 'display_title'
          },
          {
            type: 'checkbox',
            label: 'Is New',
            name: 'is_new'
          },
          {
            type: 'text',
            label: 'Description',
            name: 'description'
          },
          {
            type: 'multiSelectTable',
            label: 'Locales',
            name: 'locales'
          },
          {
            type: 'select',
            label: 'Module Data',
            name: 'module_data'
          },
          {
            type: 'img',
            label: 'Image',
            name: 'image_url'
          }
        ]
      }
    },
    {
      title: '/modules/carousels/events/',
      addModal: {
        children: [
          {
            type: 'text',
            label: 'Name',
            name: 'name'
          },
          {
            type: 'text',
            label: 'Description Text',
            name: 'description_text'
          },
          {
            type: 'text',
            label: 'URL',
            name: 'url'
          },
          {
            type: 'text',
            label: 'Display Order',
            name: 'display_order'
          },
          {
            type: 'text',
            label: 'Festival Start Date',
            name: 'festival_start_date'
          },
          {
            type: 'text',
            label: 'Duration',
            name: 'duration'
          },
          {
            type: 'text',
            label: 'Venue',
            name: 'venue'
          },
          {
            type: 'text',
            label: 'Location URL',
            name: 'location_url'
          },
          {
            type: 'text',
            label: 'Cost',
            name: 'cost'
          },
          {
            type: 'text',
            label: 'Tags',
            name: 'tags'
          },
          {
            type: 'text',
            label: 'Languages',
            name: 'languages'
          },
          {
            type: 'text',
            label: 'AgeLimit',
            name: 'age_limit'
          },
          {
            type: 'text',
            label: 'Other',
            name: 'other'
          },
          {
            type: 'multiSelectTable',
            label: 'Locales',
            name: 'locales'
          },
          {
            type: 'img',
            label: 'Image',
            name: 'image_url'
          },
          {
            type: 'paragraph',
            label: 'Images',
            name: 'image_urls'
          },
          {
            type: 'button',
            name: 'Add Images'
          },
          {
            type: 'text',
            label: 'Description',
            name: 'description'
          }
        ]
      }
    },
    {
      title: '/modules/carousels/carouselGrouping/carouselGrouping',
      addModal: {
        children: [
          {
            type: 'select',
            name: 'Module Name'
          },
          {
            type: 'text',
            name: 'Name'
          },
          {
            type: 'text',
            name: 'Display Order'
          },
          {
            type: 'checkbox',
            name: 'New Record'
          },
          {
            type: 'checkbox',
            name: 'Is IOS'
          },
          {
            type: 'multiSelectTable',
            name: 'Locales'
          },
          {
            type: 'select',
            name: 'Module Data'
          },
          {
            type: 'img',
            name: 'Image'
          }
        ]
      }
    },
    {
      title: '/modules/carousels/carouselGrouping/carouselGroupingModules',
      addModal: {
        children: [
          {
            type: 'select',
            name: 'Module Name'
          },
          {
            type: 'text',
            name: 'Display Name'
          },
          {
            type: 'img',
            name: 'Image'
          },
          {
            type: 'text',
            name: 'Display Order'
          },
          {
            type: 'multiSelectTable',
            name: 'Locales'
          }
        ]
      }
    },
    {
      title: '/modules/editorials/editorials/',
      addModal: {
        children: [
          {
            type: 'select',
            label: 'Category',
            name: 'category_id'
          },
          {
            type: 'select',
            label: 'Sub Category',
            name: 'subcategory_id'
          },
          {
            type: 'text',
            label: 'Title',
            name: 'title'
          },
          {
            type: 'checkbox',
            label: 'KeyWords',
            name: 'keywords'
          },
          {
            type: 'checkbox',
            label: 'Editorial Date',
            name: 'editorial_date'
          },
          {
            type: 'text',
            label: 'Short Description',
            name: 'short_description'
          },
          {
            type: 'text',
            label: 'Share URL',
            name: 'share_url'
          },
          {
            type: 'img',
            label: 'Image',
            children: [
              {
                type: 'chooseFromUploadedImages',
                label: 'Choose From Uploaded Images',
                props: {
                  hasImageModules: true,
                  hasImageModulesData: {
                    data: []
                  },
                  hasLocale: true,
                  hasLocaleData: {
                    data: []
                  },
                  hasIsCustomisedGod: false
                }
              }
            ]
          },
          {
            type: 'multiSelectTable',
            label: 'Locales',
            name: 'locales'
          },
          {
            type: 'paragraph',
            label: 'Likes',
            name: 'likes'
          },
          {
            type: 'paragraph',
            label: 'Shares',
            name: 'shares'
          },
          {
            type: 'paragraph',
            label: 'Comments',
            name: 'comments'
          }
        ]
      }
    },
    {
      title: '/modules/templeConnect/templesOfIndia/',
      addModal: {
        children: [
          {
            type: 'paragraph',
            label: 'Please select the locale !!'
          },
          {
            type: 'languagesList',
            label: '',
            name: 'language_id'
          },
          {
            type: 'multiSelectTable',
            label: 'Locales',
            name: 'locales'
          },
          {
            type: 'multiSelectTable',
            label: 'Deity',
            name: 'deity_id'
          },
          {
            type: 'text',
            label: 'Name',
            name: 'name'
          },
          {
            type: 'text',
            label: 'Short Description',
            name: 'short_description'
          },
          {
            type: 'text',
            label: 'URL',
            name: 'url'
          },
          {
            type: 'img',
            label: 'Image',
            name: 'image_url'
          }
        ]
      }
    },
    {
      title: '/modules/templeConnect/templeArchitecture/',
      addModal: {
        children: [
          {
            type: 'paragraph',
            label: 'Please select the locale !!'
          },
          {
            type: 'languagesList',
            label: '',
            name: 'language_id'
          },
          {
            type: 'multiSelectTable',
            label: 'Locales',
            name: 'locales'
          },
          {
            type: 'text',
            label: 'Name',
            name: 'name'
          },
          {
            type: 'text',
            label: 'Short Description',
            name: 'short_description'
          },
          {
            type: 'text',
            label: 'URL',
            name: 'url'
          },
          {
            type: 'text',
            label: 'Duration',
            name: 'duration'
          },
          {
            type: 'checkbox',
            label: 'Is Android',
            name: 'is_android'
          },
          {
            type: 'checkbox',
            label: 'Is IOS',
            name: 'is_ios'
          },
          {
            type: 'img',
            label: 'Image',
            name: 'image_url'
          },
          {
            type: 'paragraph',
            label: 'Temple Description',
            name: 'temple_description'
          },
          {
            type: 'editor',
            label: 'Editor'
          }
        ]
      }
    },
    {
      title: '/modules/prasads/',
      addModal: {
        children: [
          {
            type: 'paragraph',
            name: 'Please select the locale !!'
          },
          {
            type: 'languagesList',
            label: '',
            name: 'language_id'
          },
          {
            type: 'text',
            label: 'Name',
            name: 'name'
          },
          {
            type: 'text',
            label: 'Short Description',
            name: 'short_description'
          },
          {
            type: 'text',
            label: 'URL',
            name: 'url'
          },
          {
            type: 'text',
            label: 'Duration',
            name: 'duration'
          },
          {
            type: 'select',
            label: 'Prasad Category',
            name: 'prasad_category_id',
            data: [
              {
                label: 'Naivedyam',
                key: 1,
                value: 1
              },
              {
                label: 'Laddu',
                key: 1,
                value: 1
              }
            ]
          },
          {
            type: 'checkbox',
            label: 'Is Android',
            name: 'is_android'
          },
          {
            type: 'checkbox',
            label: 'Is IOS',
            name: 'is_ios'
          },
          {
            type: 'multiSelectTable',
            label: 'Locales',
            name: 'locales'
          },
          {
            type: 'multiSelectTable',
            label: 'Festivals',
            name: 'festival_id'
          },
          {
            type: 'img',
            label: 'Image',
            name: 'image_url'
          },
          {
            type: 'paragraph',
            label: 'Prasad Description'
          },
          {
            type: 'editor',
            label: 'Editor'
          }
        ]
      }
    },
    {
      title: '/modules/notifyUsers/pushNotification/',
      addModal: {
        children: [
          {
            type: 'text',
            label: 'Header Text',
            name: 'header_text'
          },
          {
            type: 'text',
            label: 'Write Message',
            name: 'message_text'
          },
          {
            type: 'img',
            label: 'Upload Image',
            name: 'image_url'
          },
          {
            type: 'paragraph',
            label: 'Send Type',
            name: 'send_type',
            hasRadioButtons: true,
            data: [
              {
                type: 'radio',
                label: 'User Email',
                name: 'user_email'
              },
              {
                type: 'radio',
                label: 'Language & Location',
                name: 'languge_id'
              },
              {
                type: 'radio',
                label: 'Device Token',
                name: 'device_token'
              }
            ]
          },
          {
            type: 'text',
            label: 'User Details',
            name: 'user_details'
          },
          {
            type: 'content',
            label:
              'Note: For multiple E-mails / DeviceTokens, use semicolon (;) separator To use Deep Linking, please use only one EmailID / Device Token'
          },
          {
            type: 'checkbox',
            label: 'Is Deep Linking Required',
            name: 'deep_linking'
          },
          {
            type: 'button',
            label: 'Send Notification'
          }
        ]
      }
    },
    {
      title: '/modules/banners/',
      addModal: {
        children: [
          {
            type: 'text',
            label: 'Name',
            name: 'name'
          },
          {
            type: 'multiSelectTable',
            label: 'Locales',
            name: 'locales'
          },
          {
            type: 'paragraph',
            label: 'Banners'
          },
          {
            type: 'button',
            label: 'Add Banner',
            addBanner: true,
            children: [
              {
                type: 'chooseFromUploadedImages',
                name: 'Choose From Uploaded Images',
                props: {
                  hasImageModules: true,
                  hasImageModulesData: {
                    data: [
                      {
                        label: 'Deities',
                        key: 1,
                        value: 1
                      }
                    ]
                  },
                  imageModulesOptions: [],
                  hasLocale: true,
                  hasLocaleData: {
                    data: [
                      {
                        label: 'Australia-Australia-Bengali(AUS-AUS-BGL)',
                        key: 1,
                        value: 1
                      }
                    ]
                  },
                  hasIsCustomisedGod: false
                }
              }
            ]
          }
        ]
      }
    }
  ]

  return JSON.stringify(template)
}
