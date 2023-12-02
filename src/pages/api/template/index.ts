import { NextApiRequest, NextApiResponse } from 'next/types'

import prisma from 'src/utlis/prisma'

export const templateJson = async () => {
  const locales = await prisma.locales.findMany({})
  const imageModules = await prisma.imageModules.findMany({})
  const countries = await prisma.country.findMany({})
  const locations = await prisma.locations.findMany({})
  const languages = await prisma.languages.findMany({})
  const zones = await prisma.zone.findMany({})
  const panchang = await prisma.panchang.findMany({})
  const categories = await prisma.editorialCategories.findMany({})
  const subCategories = await prisma.editorialSubCategories.findMany({})
  const deities = await prisma.deities.findMany({})
  const festivals = await prisma.festivals.findMany({})
  const moduleStatus = await prisma.moduleStatus.findMany({})
  const deviceType = await prisma.deviceType.findMany({})
  const artists = await prisma.artists.findMany({})
  const weekDays = await prisma.weekDays.findMany({})
  const pujaType = await prisma.pujaType.findMany({})
  const geetQuotes = await prisma.geetaQuotes.findMany({})
  const mangaldeepGeetCategory = await prisma.mangaldeepGeetCategory.findMany({})
  const moduleNames = (await prisma.carouselGroupingModules.findMany({})).map(module => { return { label: module.display_name, value: module.id } })
  const prasadCategory = await prisma.prasadCategory.findMany({})
  const emails = await prisma.users.findMany({ select: { email: true } })
  const albums = await prisma.albums.findMany({})

  const userManagementTemplate = [
    {
      title: '/userManagement/addUser/',
      addModal: {
        children: [
          {
            type: 'text',
            label: 'First Name',
            name: 'first_name',
            validation: {
              required: 'Please enter first name'
            }
          },
          {
            type: 'text',
            label: 'Second Name',
            name: 'second_name',
            validation: {
              required: 'Please enter second name'
            }
          },
          {
            type: 'text',
            label: 'Email',
            name: 'email',
            validation: {
              required: 'Please enter email'
            }
          },
          {
            type: 'text',
            label: 'Password',
            name: 'password',
            validation: {
              required: 'Please enter password'
            }
          },
          {
            type: 'text',
            label: 'Confirm Password',
            name: 'confirm_password',
            validation: {
              required: 'Please enter confirm password'
            }
          },
          {
            type: 'paragraph',
            label: 'Role',
            name: 'title'
          },
          {
            type: 'checkbox',
            label: 'Is Admin',
            name: 'is_admin'
          },
          {
            type: 'button',
            label: 'Register'
          }
        ]
      }
    },
    {
      title: '/userManagement/changePassword/',
      addModal: {
        children: [
          {
            type: 'text',
            label: 'Current password',
            name: 'current_password',
            validation: {
              required: 'Please enter currect password'
            }
          },
          {
            type: 'text',
            label: 'New password',
            name: 'new_password',
            validation: {
              required: 'Please select new password'
            }
          },
          {
            type: 'text',
            label: 'Confirm new password',
            name: 'confirm_new_password',
            validation: {
              required: 'Please select confirm new password'
            }
          },
          {
            type: 'button',
            label: 'Change Password'
          }
        ]
      }
    },
    {
      title: '/userManagement/resetPassword/',
      addModal: {
        children: [
          {
            type: 'text',
            label: 'Email',
            name: 'email'
          },
          {
            type: 'text',
            label: 'Password',
            name: 'password'
          },
          {
            type: 'text',
            label: 'Confirm new password',
            name: 'confirm_new_password'
          },
          {
            type: 'button',
            name: 'Reset'
          }
        ]
      }
    },
    {
      title: '/userManagement/addUserGroup/',
      addModal: {
        children: [
          {
            type: 'text',
            label: 'Group Name',
            name: 'name'
          },
          {
            type: 'autocomplete',
            label: 'Email',
            name: 'email',
            data: emails
          }
        ]
      }
    }
  ]

  const masterTemplate = [
    {
      title: '/masters/deities/',
      addModal: {
        children: [
          {
            type: 'text',
            label: 'Name',
            name: 'name',
            validation: {
              required: 'Please enter name'
            }
          },
          {
            type: 'img',
            name: 'Image',
            children: [
              {
                type: 'chooseFromUploadedImages',
                name: 'Choose From Uploaded Images',
                hasChooseUploadImages: true,
                props: {
                  hasImageModules: true,
                  hasImageModulesData: {
                    data: imageModules.map((imageModule) => { return { label: imageModule.name, value: imageModule.id } })
                  },
                  imageModulesOptions: [],
                  hasLocale: true,
                  hasLocaleData: {
                    data: locales.map((locale) => { return { label: locale?.locale_display_name, value: locale.id } })
                  },
                  hasIsCustomisedGod: true
                }
              }
            ]
          },
          {
            type: 'multiSelectTable',
            label: 'Locales',
            name: 'locales', //to-do
            data: locales,
            validation: {
              required: 'Please select the locale'
            }
          }
        ]
      },
      image_module_id: 1
    },
    {
      title: '/masters/festivals/',
      addModal: {
        children: [
          {
            type: 'text',
            label: 'Name',
            name: 'name',
            validation: {
              required: 'Please enter name'
            }
          },
          {
            type: 'checkbox',
            label: 'Is FestiveHub',
            name: 'is_festive_hub'
          },
          {
            type: 'img',
            name: 'Image',
            children: [
              {
                type: 'chooseFromUploadedImages',
                name: 'Choose From Uploaded Images',
                hasChooseUploadImages: true,
                props: {
                  hasImageModules: true,
                  hasImageModulesData: {
                    data: imageModules.map((imageModule) => { return { label: imageModule.name, value: imageModule.id } })
                  },
                  hasLocale: true,
                  hasLocaleData: {
                    data: locales.map((locale) => { return { label: locale?.locale_display_name, value: locale.id } })
                  },
                  hasIsCustomisedGod: false
                }
              }
            ]
          },
          {
            type: 'multiSelectTable',
            label: 'Locales',
            name: 'locales',
            data: locales,
            validation: {
              required: 'Please select the locale'
            }
          }
        ]
      },
      image_module_id: 9
    },
    {
      title: '/masters/locations/',
      addModal: {
        children: [
          {
            type: 'select',
            label: 'Country',
            name: 'country_id',
            data: countries.map((country) => { return { label: country.name, value: country.id } }),
            validation: {
              required: 'Please select country'
            }
          },
          {
            type: 'text',
            label: 'Name',
            name: 'name',
            validation: {
              required: 'Please enter name'
            }
          },
          {
            type: 'text',
            label: 'Code',
            name: 'location_code',
            validation: {
              required: 'Please enter location'
            }
          },
          {
            type: 'select',
            label: 'Zone',
            name: 'zone_id',
            data: zones.map((zone) => { return { label: zone.name, value: zone.id } }),
            validation: {
              required: 'Please select zone'
            }
          },
          {
            type: 'select',
            label: 'Panchang Time Zone',
            name: 'panchang_id',
            data: panchang.map((panch) => { return { label: panch.name, value: panch.id } }),
            validation: {
              required: 'Please select panchang'
            }
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
            name: 'name',
            validation: {
              required: 'Please enter name'
            }
          },
          {
            type: 'text',
            label: 'Code',
            name: 'language_code',
            validation: {
              required: 'Please enter code'
            }
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
            name: 'name',
            validation: {
              required: 'Please enter name'
            }
          },
          {
            type: 'text',
            label: 'Code',
            name: 'country_code',
            validation: {
              required: 'Please enter code'
            }
          },
          {
            type: 'checkbox',
            label: 'Is Default',
            name: 'isDefault',
          },
          {
            type: 'checkbox',
            label: 'Is Active',
            name: 'isActive',
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
            data: countries.map((country) => { return { label: country.name, value: country.id } }),
            validation: {
              required: 'Please select country'
            }
          },
          {
            type: 'select',
            label: 'Locations',
            name: 'location_id',
            data: locations.map((location) => { return { label: location.name, value: location.id } }),
            validation: {
              required: 'Please select location'
            }
          },
          {
            type: 'select',
            label: 'Languages',
            name: 'language_id',
            data: languages.map((language) => { return { label: language.name, value: language.id } }),
            validation: {
              required: 'Please select language'
            }
          },
          {
            type: 'text',
            label: 'Locale Name',
            name: 'name',
            validation: {
              required: 'Please enter name'
            }
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
            name: 'name',
            validation: {
              required: 'Please enter name'
            }
          },
          {
            type: 'img',
            name: 'Image',
            children: [
              {
                type: 'chooseFromUploadedImages',
                name: 'Choose From Uploaded Images',
                hasChooseUploadImages: true,
                props: {
                  hasImageModules: true,
                  hasImageModulesData: {
                    data: imageModules.map((imageModule) => { return { label: imageModule.name, value: imageModule.id } })
                  },
                  hasLocale: true,
                  hasLocaleData: {
                    data: locales.map((locale) => { return { label: locale?.locale_display_name, value: locale.id } })
                  },
                  hasIsCustomisedGod: false
                }
              }
            ]
          },
          {
            type: 'multiSelectTable',
            label: 'Locales',
            name: 'locales',
            data: locales,
            validation: {
              required: 'Please select the locale'
            }
          }
        ]
      },
      image_module_id: 2
    },
    {
      title: '/masters/devotionalSongs/albums/',
      addModal: {
        children: [
          {
            type: 'text',
            label: 'Name',
            name: 'name',
            validation: {
              required: 'Please enter name'
            }
          },
          {
            type: 'img',
            name: 'Image',
            children: [
              {
                type: 'chooseFromUploadedImages',
                name: 'Choose From Uploaded Images',
                hasChooseUploadImages: true,
                props: {
                  hasImageModules: true,
                  hasImageModulesData: {
                    data: imageModules.map((imageModule) => { return { label: imageModule.name, value: imageModule.id } })
                  },
                  hasLocale: true,
                  hasLocaleData: {
                    data: locales.map((locale) => { return { label: locale?.locale_display_name, value: locale.id } })
                  },
                  hasIsCustomisedGod: false
                }
              }
            ]
          },
          {
            type: 'multiSelectTable',
            label: 'Locales',
            name: 'locales',
            data: locales,
            validation: {
              required: 'Please select the locale'
            }
          }
        ]
      },
      image_module_id: 5
    },
    {
      title: '/masters/editorials/category/',
      addModal: {
        children: [
          {
            type: 'text',
            label: 'Name',
            name: 'name',
            validation: {
              required: 'Please enter name'
            }
          },
          {
            type: 'text',
            label: 'Display Order',
            name: 'display_order',
            valueType: 'number',
            validation: {
              required: 'Please enter display order'
            }
          },
          {
            type: 'img',
            name: 'Image',
            children: [
              {
                type: 'chooseFromUploadedImages',
                name: 'Choose From Uploaded Images',
                hasChooseUploadImages: true,
                props: {
                  hasImageModules: true,
                  hasImageModulesData: {
                    data: imageModules.map((imageModule) => { return { label: imageModule.name, value: imageModule.id } })
                  },
                  hasLocale: true,
                  hasLocaleData: {
                    data: locales.map((locale) => { return { label: locale?.locale_display_name, value: locale.id } })
                  },
                  hasIsCustomisedGod: false
                }
              }
            ]
          },
          {
            type: 'multiSelectTable',
            label: 'Locales',
            name: 'locales',
            data: locales,
            validation: {
              required: 'Please select the locale'
            }
          }
        ]
      },
      image_module_id: 7
    },
    {
      title: '/masters/editorials/subCategory/',
      addModal: {
        children: [
          {
            type: 'select',
            label: 'Category',
            name: 'category_id',
            data: categories.map((category) => { return { label: category.name, value: category.id } }),
            validation: {
              required: 'Please select category'
            }
          },
          {
            type: 'text',
            label: 'Sub Category',
            name: 'subcategory',
            validation: {
              required: 'Please enter sub category'
            }
          },
          {
            type: 'text',
            label: 'Display Order',
            name: 'display_order',
            valueType: 'number',
            validation: {
              required: 'Please enter display order'
            }
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
            data: [],
            validation: {
              required: 'Please select module'
            }
          },
          {
            type: 'multiSelectTable',
            label: 'Locales',
            name: 'locales',
            data: locales,
            validation: {
              required: 'Please select the locale'
            }
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
            name: 'name',
            validation: {
              required: 'Please enter the name'
            }
          },
          {
            type: 'select',
            label: 'Module',
            name: 'module_name',
            data: moduleStatus,
            validation: {
              required: 'Please select module'
            }
          },
          {
            type: 'multiSelectTable',
            label: 'Locales',
            name: 'locales',
            data: locales,
            validation: {
              required: 'Please select the locale'
            }
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
            name: 'module_name',
            validation: {
              required: 'Please enter the module name'
            }
          },
          {
            type: 'text',
            label: 'Display Order',
            name: 'display_order',
            valueType: 'number',
            validation: {
              required: 'Please enter the display order'
            }
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
            data: deities.map((deity) => { return { label: deity.name, value: deity.id } }),
            validation: {
              required: 'Please select deity'
            }
          },
          {
            type: 'text',
            label: 'Keywords',
            name: 'keyword',
            validation: {
              required: 'Please enter the keyword'
            }
          },
          {
            type: 'multiSelectTable',
            label: 'Locales',
            name: 'locales',
            data: locales,
            validation: {
              required: 'Please select the locale'
            }
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
            data: deities.map((deity) => { return { label: deity.name, value: deity.id } }),
            validation: {
              required: 'Please select deity'
            }
          },
          {
            type: 'text',
            label: 'Name',
            name: 'name',
            validation: {
              required: 'Please enter the name'
            }
          },
          {
            type: 'multiSelectTable',
            label: 'Locales',
            name: 'locales',
            data: locales,
            validation: {
              required: 'Please select the locale'
            }
          },
          {
            type: 'text',
            label: 'Latitude',
            name: 'latitude',
            valueType: 'number',
            validation: {
              required: 'Please enter the latitude'
            }
          },
          {
            type: 'text',
            label: 'Longitude',
            name: 'longitude',
            valueType: 'number',
            validation: {
              required: 'Please enter the longitude'
            }
          },
          {
            type: 'img',
            name: 'Image',
            children: [
              {
                type: 'chooseFromUploadedImages',
                name: 'Choose From Uploaded Images',
                hasChooseUploadImages: true,
                props: {
                  hasImageModules: true,
                  hasImageModulesData: {
                    data: imageModules.map((imageModule) => { return { label: imageModule.name, value: imageModule.id } })
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
      },
      image_module_id: 19
    },
    {
      title: '/masters/feedbackCategory/',
      addModal: {
        children: [
          {
            type: 'text',
            label: 'Name',
            name: 'name',
            validation: {
              required: 'Please enter name'
            }
          },
          {
            type: 'select',
            label: 'Language',
            name: 'language_id',
            data: languages.map((language) => { return { label: language.name, value: language.id } }),
            validation: {
              required: 'Please select language'
            }
          },
          {
            type: 'text',
            label: 'Display Order',
            name: 'display_order',
            valueType: 'number',
            validation: {
              required: 'Please enter display order'
            }
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
            name: 'name',
            validation: {
              required: 'Please enter name'
            }
          },
          {
            type: 'select',
            label: 'Language',
            name: 'language_id',
            data: languages.map((language) => { return { label: language.name, value: language.id } }),
            validation: {
              required: 'Please select language'
            }
          },
          {
            type: 'text',
            label: 'Display Order',
            name: 'display_order',
            valueType: 'number',
            validation: {
              required: 'Please enter display order'
            }
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
            name: 'name',
            validation: {
              required: 'Please enter name'
            }
          },
          {
            type: 'select',
            label: 'Language',
            name: 'language_id',
            data: languages.map((language) => { return { label: language.name, value: language.id } }),
            validation: {
              required: 'Please select language'
            }
          },
          {
            type: 'text',
            label: 'Display Order',
            name: 'display_order',
            valueType: 'number',
            validation: {
              required: 'Please enter display order'
            }
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
                hasChooseUploadImages: true,
                props: {
                  hasImageModules: true,
                  hasImageModulesData: {
                    data: imageModules
                  },
                  hasLocale: true,
                  hasLocaleData: {
                    data: locales
                  },
                  hasIsCustomisedGod: false
                }
              }
            ]
          },
          {
            type: 'multiSelectTable',
            label: 'Locales',
            name: 'locales',
            validation: {
              required: 'Please select the locale'
            }
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
            name: 'version_number',
            valueType: 'number',
            validation: {
              required: 'Please enter version number'
            }
          },
          {
            type: 'text',
            label: 'Build Number',
            name: 'build_number',
            valueType: 'number',
            validation: {
              required: 'Please enter build number'
            }
          },
          {
            type: 'text',
            label: 'Version Date',
            name: 'version_date',
            valueType: 'date',
            validation: {
              required: 'Please enter version date'
            }
          },
          {
            type: 'select',
            label: 'Device Type',
            name: 'device_type_id',
            data: deviceType.map((type) => { return { label: type?.name, value: type?.id } }),
            validation: {
              required: 'Please select device type'
            }
          },
          {
            type: 'checkbox',
            label: 'Is Backward Compatible',
            name: 'is_backward_compatible',
            validation: {
              required: 'Please select is backward compatible'
            }
          },
          {
            type: 'text',
            label: 'Pop Up Count',
            name: 'popup_count',
            valueType: 'number',
            validation: {
              required: 'Please enter pop up count'
            }
          }
        ]
      }
    }
  ]

  const modulesTemplate = [
    {
      title: '/modules/devotionalSong/devotionalSongs/',
      addModal: {
        children: [
          {
            type: 'text',
            label: 'Title',
            name: 'title',
            validation: {
              required: 'Please enter title'
            }
          },
          {
            type: 'text',
            label: 'Name',
            name: 'name',
            validation: {
              required: 'Please enter name'
            }
          },
          {
            type: 'text',
            label: 'Description To Share',
            name: 'description_to_share',
          },
          {
            type: 'text',
            label: 'Audio URL',
            name: 'audio_url',
            validation: {
              required: 'Please enter audio url'
            }
          },
          {
            type: 'multiSelectTable',
            label: 'Deity',
            name: 'deities',
            data: deities,
            validation: {
              required: 'Please select deities'
            }
          },
          {
            type: 'select',
            label: 'Album',
            name: 'album_id',
            data: albums.map((album) => { return { label: album.name, value: album.id } }),
          },
          {
            type: 'checkbox',
            label: 'Is NewSong',
            name: 'is_new_song',
          },
          {
            type: 'checkbox',
            label: 'Is Featured',
            name: 'is_featured',
          },
          {
            type: 'checkbox',
            label: 'Is Famous Song',
            name: 'is_famous_song',
          },
          {
            type: 'multiSelectTable',
            label: 'Locales',
            name: 'locales',
            data: locales,
            validation: {
              required: 'Please select the locale'
            }
          },
          {
            type: 'text',
            label: 'Upload Song',
            name: 'upload_song'
          },
          {
            type: 'multiSelectTable',
            label: 'Artist',
            name: 'artists',
            data: artists,
            validation: {
              required: 'Please select the artists'
            }
          },
          {
            type: 'img',
            name: 'Image',
            children: [
              {
                type: 'chooseFromUploadedImages',
                name: 'Choose From Uploaded Images',
                hasChooseUploadImages: false,
                props: {
                  hasImageModules: true,
                  hasImageModulesData: {
                    data: imageModules.map((imageModule) => { return { label: imageModule.name, value: imageModule.id } })
                  },
                  hasLocale: true,
                  hasLocaleData: {
                    data: locales.map((locale) => { return { label: locale.name, value: locale.id } })
                  },
                  hasIsCustomisedGod: false
                }
              }
            ]
          },
          {
            type: 'checkbox',
            label: 'Add to Trending now',
            name: 'is_trending_now',
          }
        ]
      },
      categoryName: 'devotionalSongs',
      typeId: 3,
      image_module_id: 6
    },
    {
      title: '/modules/devotionalSong/mostPlayedSong/',
      addModal: {
        children: [
          {
            type: 'select',
            label: 'Select Locales',
            name: 'locales',
            data: locales.map((locale) => { return { label: locale?.locale_display_name, value: locale.id } }),
            validation: {
              required: 'Please select locale'
            }
          },
          {
            type: 'multiSelectTable',
            label: 'Most Played Songs',
            name: 'songs',
            data: null,
            validation: {
              required: 'Please select the song'
            }
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
            name: 'name',
            validation: {
              required: 'Please enter name'
            }
          },
          {
            type: 'text',
            label: 'Disclaimer Text',
            name: 'disclaimer',
            validation: {
              required: 'Please enter disclaimer text'
            }
          },
          {
            type: 'img',
            name: 'Image',
            children: [
              {
                type: 'chooseFromUploadedImages',
                name: 'Choose From Uploaded Images',
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
            name: 'store_url',
            validation: {
              required: 'Please enter store url'
            }
          },
          {
            type: 'text',
            label: 'Order ID',
            name: 'order_id',
            validation: {
              required: 'Please enter order id'
            }
          },
          {
            type: 'multiSelectTable',
            label: 'Locales',
            name: 'locales',
            data: locales,
            validation: {
              required: 'Please select the locale'
            }
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
            name: 'name',
            validation: {
              required: 'Please enter name'
            }
          },
          {
            type: 'multiSelectTable',
            label: 'Week Day',
            name: 'weekday',
            data: weekDays,
            validation: {
              required: 'Please select the locale'
            }
          },
          {
            type: 'text',
            label: 'Description',
            name: 'description',
          },
          {
            type: 'text',
            label: 'Description To Share',
            name: 'description_to_share',
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
                    data: imageModules.map((imageModule) => { return { label: imageModule.name, value: imageModule.id } })
                  },
                  hasLocale: true,
                  hasLocaleData: {
                    data: locales.map((locale) => { return { label: locale.name, value: locale.id } })
                  },
                  hasIsCustomisedGod: false
                }
              }
            ]
          },
          {
            type: 'text',
            label: 'Background',
            name: 'background',
            validation: {
              required: 'Please enter background'
            }
          },
          {
            type: 'text',
            label: 'Timings',
            name: 'timings',
          },
          {
            type: 'multiSelectTable',
            label: 'Puja Type',
            name: 'puja_type',
            data: pujaType,
            validation: {
              required: 'Please select the locale'
            }
          },
          {
            type: 'multiSelectTable',
            label: 'Deity',
            name: 'deities',
            data: deities,
            validation: {
              required: 'Please select the locale'
            }
          },
          {
            type: 'multiSelectTable',
            label: 'Festival',
            name: 'festivals',
            data: festivals,
            validation: {
              required: 'Please select the locale'
            }
          },
          {
            type: 'multiSelectTable',
            label: 'Locales',
            name: 'locales',
            data: locales,
            validation: {
              required: 'Please select the locale'
            }
          },
          {
            type: 'text',
            label: 'Procedure',
            name: 'procedure'
          },
          {
            type: 'pujaMaterialAndQty',
            label: 'Puja Material & Qty',
            name: 'pujaMaterial'
          },
          {
            type: 'checkbox',
            label: 'Add to Trending now',
            name: 'is_trending_now',
          }
        ]
      },
      categoryName: 'puja',
      typeId: 1,
      image_module_id: 11
    },
    {
      title: '/modules/puja/sankalps/',
      addModal: {
        children: [
          {
            type: 'text',
            label: 'Sankalp Text',
            name: 'text',
            validation: {
              required: 'Please enter sankalp text'
            }
          },
          {
            type: 'multiSelectTable',
            label: 'Locales',
            name: 'locales',
            data: locales,
            validation: {
              required: 'Please select the locale'
            }
          }
        ]
      }
    },
    {
      title: '/modules/panchang/dainikPanchang/',
      addModal: {
        children: [
          {
            type: 'date',
            label: 'Panchang Date',
            name: 'panchang_date',
            validation: {
              required: 'Please enter panchang date'
            }
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
            name: 'day',
            validation: {
              required: 'Please enter day'
            }
          },
          {
            type: 'text',
            label: 'Karna',
            name: 'karna',
            validation: {
              required: 'Please enter karna'
            }
          },
          {
            type: 'text',
            label: 'Yoga',
            name: 'yoga',
            validation: {
              required: 'Please enter yoga'
            }
          },
          {
            type: 'text',
            label: 'Nakshatra',
            name: 'nakshatra',
            validation: {
              required: 'Please enter nakshatra'
            }
          },
          {
            type: 'text',
            label: 'Sunrise',
            name: 'sunrise',
            validation: {
              required: 'Please enter sunrise'
            }
          },
          {
            type: 'text',
            label: 'Sunset',
            name: 'sunset',
            validation: {
              required: 'Please enter sunset'
            }
          },
          {
            type: 'text',
            label: 'Moonrise',
            name: 'moonrise',
            validation: {
              required: 'Please enter moonrise'
            }
          },
          {
            type: 'text',
            label: 'Moonset',
            name: 'moonset',
            validation: {
              required: 'Please enter moonset'
            }
          },
          {
            type: 'text',
            label: 'Ayana',
            name: 'ayana',
            validation: {
              required: 'Please enter ayana'
            }
          },
          {
            type: 'text',
            label: 'Masa',
            name: 'masa',
            validation: {
              required: 'Please enter masa'
            }
          },
          {
            type: 'text',
            label: 'Rutu',
            name: 'rutu',
            validation: {
              required: 'Please enter rutu'
            }
          },
          {
            type: 'text',
            label: 'Samvatsara',
            name: 'samvatsara',
            validation: {
              required: 'Please enter samvatsara'
            }
          },
          {
            type: 'text',
            label: 'Saura Masa',
            name: 'saura_masa',
            validation: {
              required: 'Please enter saura masa'
            }
          },
          {
            type: 'text',
            label: 'Gulikakala',
            name: 'gulikakala',
            validation: {
              required: 'Please enter gulikakala'
            }
          },
          {
            type: 'text',
            label: 'Rahukala',
            name: 'rahukal',
            validation: {
              required: 'Please enter rahukala'
            }
          },
          {
            type: 'text',
            label: 'Yamagandakala',
            name: 'yamagandakala',
            validation: {
              required: 'Please enter yamagandakala'
            }
          },
          {
            type: 'multiSelectTable',
            label: 'Locales',
            name: 'locales',
            data: locales,
            validation: {
              required: 'Please select the locale'
            }
          },
          {
            type: 'text',
            label: 'Summary',
            name: 'summary',
            validation: {
              required: 'Please enter summary'
            }
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
            data: festivals.map((festival) => { return { label: festival.name, value: festival.id } }),
            validation: {
              required: 'Please select festival'
            }
          },
          {
            type: 'date',
            label: 'Festival Date',
            name: 'festival_date',
            validation: {
              required: 'Please enter festival date'
            }
          },
          {
            type: 'multiSelectTable',
            label: 'Locales',
            name: 'locales',
            data: locales,
            validation: {
              required: 'Please select the locale'
            }
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
            data: languages,
            validation: {
              required: 'Please select language'
            }
          },
          {
            type: 'select',
            label: 'Location',
            name: 'location_id',
            data: locations,
            validation: {
              required: 'Please select location'
            }
          },
          {
            type: 'select',
            label: 'Locales',
            name: 'locale_id',
            data: locales,
            validation: {
              required: 'Please select locale'
            }
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
            data: deities.map((deity) => { return { label: deity.name, value: deity.id } }),
            validation: {
              required: 'Please select deity'
            }
          },
          {
            type: 'text',
            label: 'Name',
            name: 'name',
            validation: {
              required: 'Please enter name'
            }
          },
          {
            type: 'text',
            label: 'Description Text',
            name: 'description_text',
            validation: {
              required: 'Please enter description text'
            }
          },
          {
            type: 'text',
            label: 'Mantra Content',
            name: 'mantra_content',
            validation: {
              required: 'Please enter mantra content'
            }
          },
          {
            type: 'text',
            label: 'Pronunciation',
            name: 'pronunciation',
            validation: {
              required: 'Please enter pronunciation'
            }
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
            name: 'locales',
            data: locales,
            validation: {
              required: 'Please select the locale'
            }
          },
          {
            type: 'text',
            label: 'Upload Song',
            name: 'upload_song'
          },
          {
            type: 'checkbox',
            label: 'Add to Trending now',
            name: 'is_trending_now',
          }
        ]
      },
      categoryName: 'mantras',
      typeId: 1
    },
    {
      title: '/modules/mantras/shlokas/',
      addModal: {
        children: [
          {
            type: 'select',
            label: 'Deity',
            name: 'deity_id',
            data: deities.map((deity) => { return { label: deity.name, value: deity.id } }),
            validation: {
              required: 'Please select deity'
            }
          },
          {
            type: 'text',
            label: 'Name',
            name: 'name',
            validation: {
              required: 'Please enter name'
            }
          },
          {
            type: 'text',
            label: 'Description',
            name: 'description',
            validation: {
              required: 'Please enter description'
            }
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
                    data: imageModules.map((imageModule) => { return { label: imageModule.name, value: imageModule.id } })
                  },
                  hasLocale: true,
                  hasLocaleData: {
                    data: locales.map((locale) => { return { label: locale.name, value: locale.id } })
                  },
                  hasIsCustomisedGod: false
                }
              }
            ]
          },
          {
            type: 'text',
            label: 'Shloka Content',
            name: 'shloka_content',
            validation: {
              required: 'Please enter shloka content'
            }
          },
          {
            type: 'text',
            label: 'Pronunciation ',
            name: 'pronunciation',
            validation: {
              required: 'Please enter pronunciation'
            }
          },
          {
            type: 'text',
            label: 'Description To Share ',
            name: 'description_to_share',
          },
          {
            type: 'multiSelectTable',
            label: 'Locales',
            name: 'locales',
            data: locales,
            validation: {
              required: 'Please select the locale'
            }
          },
          {
            type: 'text',
            label: 'Upload Song',
            name: 'upload_song'
          }
        ]
      },
      image_module_id: 12
    },
    {
      title: '/modules/mantras/ashtothras/',
      addModal: {
        children: [
          {
            type: 'select',
            label: 'Deity',
            name: 'deity_id',
            data: deities.map((deity) => { return { label: deity.name, value: deity.id } }),
            validation: {
              required: 'Please select deity'
            }
          },
          {
            type: 'text',
            label: 'Name',
            name: 'name',
            validation: {
              required: 'Please enter name'
            }
          },
          {
            type: 'text',
            label: 'Description To Share',
            name: 'description_to_share'
          },
          {
            type: 'multiSelectTable',
            label: 'Locales',
            name: 'locales',
            data: locales,
            validation: {
              required: 'Please select the locale'
            }
          },
          {
            type: 'ashtothraDetails',
            label: 'Copy & Paste the Ashtothra Names',
            name: 'ashtothra_details'
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
            data: deities.map((deity) => { return { label: deity.name, value: deity.id } }),
            validation: {
              required: 'Please select deity'
            }
          },
          {
            type: 'text',
            label: 'Name',
            name: 'name',
            validation: {
              required: 'Please enter name'
            }
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
                    data: imageModules.map((imageModule) => { return { label: imageModule.name, value: imageModule.id } })
                  },
                  hasLocale: true,
                  hasLocaleData: {
                    data: locales.map((locale) => { return { label: locale?.locale_display_name, value: locale.id } })
                  },
                  hasIsCustomisedGod: false
                }
              }
            ]
          },
          {
            type: 'text',
            label: 'Description To Share',
            name: 'description_to_share',
          },
          {
            type: 'multiSelectTable',
            label: 'Locales',
            name: 'locales',
            data: locales,
            validation: {
              required: 'Please select the locale'
            }
          },
          {
            type: 'text',
            label: 'Chalisa content',
            name: 'content',
            validation: {
              required: 'Please enter chalisa content'
            }
          },
        ]
      },
      image_module_id: 4
    },
    {
      title: '/modules/mantras/kavachas/',
      addModal: {
        children: [
          {
            type: 'select',
            label: 'Deity',
            name: 'deity_id',
            data: deities.map((deity) => { return { label: deity.name, value: deity.id } }),
            validation: {
              required: 'Please select deity'
            }
          },
          {
            type: 'text',
            label: 'Name',
            name: 'name',
            validation: {
              required: 'Please enter name'
            }
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
                    data: imageModules.map((imageModule) => { return { label: imageModule.name, value: imageModule.id } })
                  },
                  hasLocale: true,
                  hasLocaleData: {
                    data: locales.map((locale) => { return { label: locale?.locale_display_name, value: locale.id } })
                  },
                  hasIsCustomisedGod: false
                }
              }
            ]
          },
          {
            type: 'multiSelectTable',
            label: 'Locales',
            name: 'locales',
            data: locales,
            validation: {
              required: 'Please select the locale'
            }
          },
          {
            type: 'text',
            label: 'Kavacha Content',
            name: 'kavacha_content'
          },
          {
            type: 'editor',
            label: 'Editor'
          }
        ]
      },
      image_module_id: 10
    },
    {
      title: '/modules/geetaQuotes/geetaQuoteAudio/',
      addModal: {
        children: [
          {
            type: 'text',
            label: 'Name',
            name: 'name',
            validation: {
              required: 'Please enter name'
            }
          },
          {
            type: 'select',
            label: 'Audio Language',
            name: 'audio_language_id',
            data: languages.map((language) => { return { label: language.name, value: language.id } }),
            validation: {
              required: 'Please select audio language'
            }
          },
          {
            type: 'text',
            label: 'Upload Song',
            name: 'upload_song'
          },
          {
            type: 'multiSelectTable',
            label: 'Geeta Quotes',
            name: 'geeta_quotes',
            data: geetQuotes.map((geetaQuote) => { return { ...geetaQuote, name: `${geetaQuote.chapter} ${geetaQuote.quote_number}` } }),
            validation: {
              required: 'Please select the locale'
            }
          },
          {
            type: 'multiSelectTable',
            label: 'Languages',
            name: 'languages',
            data: languages,
            validation: {
              required: 'Please select the locale'
            }
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
            name: 'name',
            validation: {
              required: 'Please enter the name'
            }
          },
          {
            type: 'text',
            label: 'Artist Name',
            name: 'artist_name',
            validation: {
              required: 'Please enter Artist Name'
            }
          },
          {
            type: 'text',
            label: 'Display Order',
            name: 'display_order',
            valueType: 'number',
            validation: {
              required: 'Please enter Display Order'
            }
          },
          {
            type: 'checkbox',
            label: 'Is Android',
            name: 'is_android',
            validation: {
              required: 'Please select is android'
            }
          },
          {
            type: 'checkbox',
            label: 'Is IOS',
            name: 'is_ios',
            validation: {
              required: 'Please select is ios'
            }
          },
          {
            type: 'text',
            label: 'URL',
            name: 'url',
            validation: {
              required: 'Please enter URL'
            }
          },
          {
            type: 'text',
            label: 'Duration',
            name: 'duration',
            validation: {
              required: 'Please Update Video Duration!'
            }
          },
          {
            type: 'multiSelectTable',
            label: 'Locales',
            name: 'locales',
            data: locales,
            validation: {
              required: 'Please select the locale'
            }
          },
          {
            type: 'img',
            label: 'Image',
            name: 'image_url',
            validation: {
              required: 'Please upload Image'
            }
          },
          {
            type: 'paragraph',
            name: 'Description'
          },
          {
            type: 'editor',
            label: 'Editor',
            name: 'description',
            validation: {
              required: 'Please enter the Description'
            }
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
            name: 'name',
            validation: {
              required: 'Please enter name'
            }
          },
          {
            type: 'checkbox',
            label: 'Is Video',
            name: 'is_video',
            validation: {
              required: 'Please select is video'
            }
          },
          {
            type: 'text',
            label: 'Display Order',
            name: 'display_order',
            valueType: 'number',
            validation: {
              required: 'Please enter display order'
            }
          },
          {
            type: 'checkbox',
            label: 'Is Android',
            name: 'is_android',
            validation: {
              required: 'Please select is android'
            }
          },
          {
            type: 'checkbox',
            label: 'Is IOS',
            name: 'is_ios',
            validation: {
              required: 'Please select is ios'
            }
          },
          {
            type: 'text',
            label: 'Video URL',
            name: 'video_url',
            validation: {
              required: 'Please enter video url'
            }
          },
          {
            type: 'text',
            label: 'Duration',
            name: 'duration',
            validation: {
              required: 'Please enter duration'
            }
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
            name: 'locales',
            data: locales,
            validation: {
              required: 'Please select the locale'
            }
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
            name: 'name',
            validation: {
              required: 'Please enter name'
            }
          },
          {
            type: 'text',
            label: 'Short Description',
            name: 'short_description',
          },
          {
            type: 'select',
            label: 'Deity',
            name: 'deity_id',
            data: deities.map((deity) => { return { label: deity.name, value: deity.id } }),
            validation: {
              required: 'Please select deity'
            }
          },
          {
            type: 'checkbox',
            label: 'Is Second Carousel',
            name: 'is_second_carousel',
          },
          {
            type: 'checkbox',
            label: 'Is Android',
            name: 'is_android',
          },
          {
            type: 'checkbox',
            label: 'Is IOS',
            name: 'is_ios',
          },
          {
            type: 'text',
            label: 'URL',
            name: 'url',
            validation: {
              required: 'Please enter url'
            }
          },
          {
            type: 'text',
            label: 'Duration',
            name: 'duration',
            validation: {
              required: 'Please enter duration'
            }
          },
          {
            type: 'select',
            label: 'Mangaldeep Geet Category',
            name: 'mangaldeep_geet_cat_id',
            data: mangaldeepGeetCategory.map((cat) => { return { label: cat.name, value: cat.id } }),
            validation: {
              required: 'Please select mangaldeep geet category'
            }
          },
          {
            type: 'text',
            label: 'Display Order',
            name: 'display_order',
            valueType: 'number',
            validation: {
              required: 'Please enter display order'
            }
          },
          {
            type: 'multiSelectTable',
            label: 'Locales',
            name: 'locales',
            data: locales,
            validation: {
              required: 'Please select the locale'
            }
          },
          {
            type: 'img',
            label: 'Image',
            name: 'image_url',
            validation: {
              required: 'Please upload image'
            }
          },
          {
            type: 'Song Description',
            label: 'Song Description',
            name: 'song_description'
          },
          {
            type: 'editor',
            name: 'Editor'
          }
        ]
      },
      image_module_id: 15
    },
    {
      title: '/modules/carousels/dynamicBanner/',
      addModal: {
        children: [
          {
            type: 'select',
            label: 'Module Name',
            name: 'module_name_id',
            data: moduleNames,
            validation: {
              required: 'Please select module name'
            }
          },
          {
            type: 'text',
            label: 'Title',
            name: 'title',
            validation: {
              required: 'Please enter title'
            }
          },
          {
            type: 'text',
            label: 'Display Order',
            name: 'display_order',
            valueType: 'number',
            validation: {
              required: 'Please enter display order'
            }
          },
          {
            type: 'text',
            label: 'Display Title',
            name: 'display_title',
            validation: {
              required: 'Please enter display title'
            }
          },
          {
            type: 'checkbox',
            label: 'Is New',
            name: 'is_new',
            validation: {
              required: 'Please select is new'
            }
          },
          {
            type: 'text',
            label: 'Description',
            name: 'description',
            validation: {
              required: 'Please enter description'
            }
          },
          {
            type: 'multiSelectTable',
            label: 'Locales',
            name: 'locales',
            data: locales,
            validation: {
              required: 'Please select the locale'
            }
          },
          {
            type: 'select',
            label: 'Module Data',
            name: 'module_data',
            data: [],
            validation: {
              required: 'Please select module data'
            }
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
            name: 'name',
            validation: {
              required: 'Please enter name'
            }
          },
          {
            type: 'text',
            label: 'Description Text',
            name: 'description_text',
            validation: {
              required: 'Please enter description text'
            }
          },
          {
            type: 'text',
            label: 'URL',
            name: 'url'
          },
          {
            type: 'text',
            label: 'Display Order',
            name: 'display_order',
            valueType: 'number',
            validation: {
              required: 'Please enter display order'
            }
          },
          {
            type: 'text',
            label: 'Festival Start Date',
            name: 'festival_start_date',
            validation: {
              required: 'Please enter festival start date'
            }
          },
          {
            type: 'text',
            label: 'Duration',
            name: 'duration',
            validation: {
              required: 'Please enter duration'
            }
          },
          {
            type: 'text',
            label: 'Venue',
            name: 'venue',
            validation: {
              required: 'Please enter venue'
            }
          },
          {
            type: 'text',
            label: 'Location URL',
            name: 'location_url',
            validation: {
              required: 'Please enter location url'
            }
          },
          {
            type: 'text',
            label: 'Cost',
            name: 'cost',
            validation: {
              required: 'Please enter cost'
            }
          },
          {
            type: 'text',
            label: 'Tags',
            name: 'tags',
            validation: {
              required: 'Please enter tags'
            }
          },
          {
            type: 'text',
            label: 'Languages',
            name: 'languages',
            validation: {
              required: 'Please enter languages'
            }
          },
          {
            type: 'text',
            label: 'AgeLimit',
            name: 'age_limit',
            validation: {
              required: 'Please enter age limit'
            }
          },
          {
            type: 'text',
            label: 'Other',
            name: 'other',
            validation: {
              required: 'Please enter other'
            }
          },
          {
            type: 'multiSelectTable',
            label: 'Locales',
            name: 'locales',
            data: locales,
            validation: {
              required: 'Please select the locale'
            }
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
            type: 'paragraph',
            name: 'Description'
          },
          {
            type: 'editor',
            name: 'Editor'
          }
        ]
      }
    },
    {
      title: '/modules/carousels/carouselGrouping/carouselGrouping/',
      addModal: {
        children: [
          {
            type: 'select',
            label: 'Module Name',
            name: 'carousel_grouping_module_id',
            data: moduleNames,
            validation: {
              required: 'Please select module name'
            }
          },
          {
            type: 'text',
            label: 'Name',
            name: 'name',
            validation: {
              required: 'Please enter name'
            }
          },
          {
            type: 'text',
            label: 'Display Order',
            name: 'display_order',
            valueType: 'number',
            validation: {
              required: 'Please enter display order'
            }
          },
          {
            type: 'checkbox',
            label: 'New Record',
            name: 'new_record'
          },
          {
            type: 'checkbox',
            label: 'Is IOS',
            name: 'is_ios'
          },
          {
            type: 'text',
            label: 'URL',
            name: 'url',
            validation: {
              required: 'Please enter URL'
            }
          },
          {
            type: 'text',
            label: 'Duration',
            name: 'duration',
            validation: {
              required: 'Please enter duration'
            }
          },
          {
            type: 'text',
            label: 'Short Description',
            name: 'short_desc',
            validation: {
              required: 'Please enter short description'
            }
          },
          {
            type: 'multiSelectTable',
            label: 'Locales',
            name: 'locales',
            data: locales,
            validation: {
              required: 'Please select the locale'
            }
          },
          {
            type: 'img',
            label: 'Image',
            name: 'image_url'
          },
          {
            type: 'text',
            label: 'Description',
            name: 'description',
            validation: {
              required: 'Please enter description'
            }
          },
          {
            type: 'checkbox',
            label: 'Add to Trending now',
            name: 'is_trending_now',
          }
        ]
      },
      categoryName: 'carouselGrouping',
      typeId: 2
    },
    {
      title: '/modules/carousels/carouselGrouping/carouselGroupingModules/',
      addModal: {
        children: [
          {
            type: 'text',
            label: 'Display Name',
            name: 'display_name',
            validation: {
              required: 'Please enter display name'
            }
          },
          
          // {
          //   type: 'img',
          //   label: 'Image',
          //   name: 'image_url'
          // },
          {
            type: 'text',
            label: 'Display Order',
            name: 'display_order',
            valueType: 'number',
            validation: {
              required: 'Please enter display order'
            }
          },
          {
            type: 'multiSelectTable',
            label: 'Locales',
            name: 'locales',
            data: locales,
            validation: {
              required: 'Please select the locale'
            }
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
            name: 'category_id',
            data: categories.map((cat) => { return { label: cat.name, value: cat.id } }),
            validation: {
              required: 'Please select category'
            }
          },
          {
            type: 'select',
            label: 'Sub Category',
            name: 'subcategory_id',
            data: subCategories.map((subcat) => { return { label: subcat.name, value: subcat.id } }),
            validation: {
              required: 'Please select sub category'
            }
          },
          {
            type: 'text',
            label: 'Title',
            name: 'title',
            validation: {
              required: 'Please enter title'
            }
          },
          {
            type: 'text',
            label: 'KeyWords',
            name: 'keywords',
            validation: {
              required: 'Please select keyword'
            }
          },
          {
            type: 'date',
            label: 'Editorial Date',
            name: 'editorial_date',
            validation: {
              required: 'Please select editorial date'
            }
          },
          {
            type: 'text',
            label: 'Short Description',
            name: 'short_description',
            validation: {
              required: 'Please enter short description'
            }
          },
          {
            type: 'text',
            label: 'Share URL',
            name: 'share_url',
            validation: {
              required: 'Please enter share url'
            }
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
                    data: imageModules.map((imageModule) => { return { label: imageModule.name, value: imageModule.id } })
                  },
                  hasLocale: true,
                  hasLocaleData: {
                    data: locales.map((locale) => { return { label: locale?.locale_display_name, value: locale.id } })
                  },
                  hasIsCustomisedGod: false
                }
              }
            ]
          },
          {
            type: 'multiSelectTable',
            label: 'Locales',
            name: 'locales',
            data: locales,
            validation: {
              required: 'Please select the locale'
            }
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
          },
          {
            type: 'checkbox',
            label: 'Add to Trending now',
            name: 'is_trending_now',
          }
        ]
      },
      categoryName: 'editorials',
      typeId: 1,
      image_module_id: 8
    },
    {
      title: '/modules/templeConnect/templesOfIndia/',
      addModal: {
        children: [
          {
            type: 'select',
            label: 'Language',
            name: 'language_id',
            data: languages.map((language) => { return { label: language.name, value: language.id } })
          },
          {
            type: 'multiSelectTable',
            label: 'Locales',
            name: 'locales',
            data: locales,
            validation: {
              required: 'Please select the locale'
            }
          },
          {
            type: 'multiSelectTable',
            label: 'Deity',
            name: 'deities',
            data: deities,
            validation: {
              required: 'Please select the locale'
            }
          },
          {
            type: 'text',
            label: 'Name',
            name: 'name',
            validation: {
              required: 'Please enter name'
            }
          },
          {
            type: 'text',
            label: 'Short Description',
            name: 'short_description',
            validation: {
              required: 'Please enter short description'
            }
          },
          {
            type: 'text',
            label: 'URL',
            name: 'url',
            validation: {
              required: 'Please enter url'
            }
          },
          {
            type: 'img',
            label: 'Image',
            name: 'image_url'
          },
          {
            type: 'checkbox',
            label: 'Add to Trending now',
            name: 'is_trending_now',
          }
        ]
      },
      categoryName: 'templeOfIndia',
      typeId: 1,
      image_module_id: 17
    },
    {
      title: '/modules/templeConnect/templeArchitecture/',
      addModal: {
        children: [
          {
            type: 'select',
            label: 'Language',
            name: 'language_id',
            data: languages.map((language) => { return { label: language.name, value: language.id } })
          },
          {
            type: 'multiSelectTable',
            label: 'Locales',
            name: 'locales',
            data: locales,
            validation: {
              required: 'Please select the locale'
            }
          },
          {
            type: 'text',
            label: 'Name',
            name: 'name',
            validation: {
              required: 'Please enter name'
            }
          },
          {
            type: 'text',
            label: 'Short Description',
            name: 'short_description',
          },
          {
            type: 'text',
            label: 'URL',
            name: 'url',
            validation: {
              required: 'Please enter url'
            }
          },
          {
            type: 'text',
            label: 'Duration',
            name: 'duration',
            validation: {
              required: 'Please enter duration'
            }
          },
          {
            type: 'checkbox',
            label: 'Is Android',
            name: 'is_android',
          },
          {
            type: 'checkbox',
            label: 'Is IOS',
            name: 'is_ios',
          },
          {
            type: 'img',
            label: 'Image',
            name: 'image_url'
          },
          {
            type: 'text',
            label: 'Temple Description',
            name: 'temple_description'
          }
        ]
      },
      image_module_id: 18
    },
    {
      title: '/modules/prasads/',
      addModal: {
        children: [
          {
            type: 'select',
            label: 'Language',
            name: 'language_id',
            data: languages.map((language) => { return { label: language.name, value: language.id } }),
            validation: {
              required: 'Please select a language'
            }
          },
          {
            type: 'text',
            label: 'Name',
            name: 'name',
            validation: {
              required: 'Please enter name'
            }
          },
          {
            type: 'text',
            label: 'Short Description',
            name: 'short_description',
          },
          {
            type: 'text',
            label: 'URL',
            name: 'url',
            validation: {
              required: 'Please enter url'
            }
          },
          {
            type: 'text',
            label: 'Duration',
            name: 'duration',
            validation: {
              required: 'Please enter duration'
            }
          },
          {
            type: 'select',
            label: 'Prasad Category',
            name: 'prasad_category_id',
            data: prasadCategory.map((cat) => { return { label: cat.name, value: cat.id } }),
            validation: {
              required: 'Please select prasad category'
            }
          },
          {
            type: 'checkbox',
            label: 'Is Android',
            name: 'is_android',
          },
          {
            type: 'checkbox',
            label: 'Is IOS',
            name: 'is_ios',
          },
          {
            type: 'multiSelectTable',
            label: 'Locales',
            name: 'locales',
            data: locales,
            validation: {
              required: 'Please select the locale'
            }
          },
          {
            type: 'multiSelectTable',
            label: 'Festivals',
            name: 'festivals',
            data: festivals,
            validation: {
              required: 'Please select the locale'
            }
          },
          {
            type: 'img',
            label: 'Image',
            name: 'image_url'
          },
          {
            type: 'text',
            label: 'Prasad Description',
            name: 'prasad_description'
          }
        ]
      },
      image_module_id: 16
    },
    {
      title: '/modules/notifyUsers/pushNotification/',
      addModal: {
        children: [
          {
            type: 'text',
            label: 'Header Text',
            name: 'header_text',
            validation: {
              required: 'Please enter header text'
            }
          },
          {
            type: 'text',
            label: 'Write Message',
            name: 'message_text',
            validation: {
              required: 'Please enter message text'
            }
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
            name: 'user_details',
            validation: {
              required: 'Please enter user details'
            }
          },
          {
            type: 'content',
            label:
              'Note: For multiple E-mails / DeviceTokens, use semicolon (;) separator To use Deep Linking, please use only one EmailID / Device Token'
          },
          {
            type: 'checkbox',
            label: 'Is Deep Linking Required',
            name: 'deep_linking',
            validation: {
              required: 'Please select deep linking'
            }
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
            name: 'name',
            validation: {
              required: 'Please enter name'
            }
          },
          {
            type: 'multiSelectTable',
            label: 'Locales',
            name: 'locales',
            data: locales,
            validation: {
              required: 'Please select the locale'
            }
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
                    data: imageModules.map((imageModule) => { return { label: imageModule.name, value: imageModule.id } })
                  },
                  imageModulesOptions: [],
                  hasLocale: true,
                  hasLocaleData: {
                    data: locales.map((locale) => { return { label: locale?.locale_display_name, value: locale.id } })
                  },
                  hasIsCustomisedGod: false
                }
              }
            ]
          }
        ]
      },
      image_module_id: 3
    },
    {
      title: '/modules/about/',
      addModal: {
        children: [
          {
            type: 'select',
            label: 'Category',
            name: 'category',
            data: [{label:"About us",value: "About us"},{label:"Terms & Condition",value: "Terms & Condition"}],
            validation: {
              required: 'Please select category'
            }
          },
          {
            type: 'text',
            label: 'Description',
            name: 'description',
            validation: {
              required: 'Please add description'
            }
          }
        ]
      },
    },
    {
      title: '/modules/quotes/',
      addModal: {
        children: [
          {
            type: 'quoteDetails',
            label: 'Description',
            name: 'description',
            isAdd:true
          },
          {
            type: 'descriptiontext',
            label: 'Description',
            name: 'description',
            isEdit: true
          }
        ]
      }
    }
  ]

  return {
    userManagement: JSON.stringify(userManagementTemplate),
    masters: JSON.stringify(masterTemplate),
    modules: JSON.stringify(modulesTemplate),
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const results = await templateJson()
    res.status(200).send({ data: results })
  } catch (e) {
    console.log('err in template api', e)
    res.status(500).send(e)
  }
}
