/**
 * ZENVY Admin Data Store
 * ─────────────────────
 * Real persistence layer mirroring the Prisma schema.
 * Uses localStorage as storage engine.
 * Swappable to REST API: replace each method body.
 */

const DB_VERSION = 'zenvy_v1';

// ── Active Live Catalog Baseline (Instant 0ms load across all devices) ──
const ACTIVE_CATALOG_BASELINE = [
  {
    "shortDesc": "চায়না থেকে Imported অথেনটিক Player Version জার্সি",
    "assignedPatches": [],
    "expectedDelivery": null,
    "seoDesc": "",
    "sizeChartType": "Player Edition",
    "slug": "ajax-third-kit",
    "isDeliveryChargeMandatory": false,
    "isLimited": true,
    "deliveryNote": "",
    "isNewArrival": false,
    "description": "* সরাসরি চায়না থেকে ইমপোর্ট করা শতভাগ প্রিমিয়াম কোয়ালিটির অথেনটিক প্লেয়ার ভার্সন জার্সি।\n* অত্যন্ত হালকা, স্ট্রেচেবল এবং বাতাস চলাচলের উপযোগী ফেব্রিক দিয়ে তৈরি।\n* ক্লাব লোগো, ব্র্যান্ড লোগো এবং স্পনসর প্রিন্ট নিখুঁত ও টেকসই হিট-প্রেসড প্রযুক্তিতে বসানো।\n* প্লেয়ারদের জার্সির মতো বডি-হাগিং অ্যাথলেটিক স্লিম ফিট ও নিখুঁত সেলাইয়ের ফিনিশিং।\n* নিয়মিত খেলাধুলা কিংবা ক্যাজুয়াল আউটফিট হিসেবে পরার জন্য অত্যন্ত আরামদায়ক ও আকর্ষণীয়।",
    "isPreorder": false,
    "isBestSeller": false,
    "sku": "ZNV-MWF6CMAW",
    "categoryId": "cat_mens_football",
    "customPrintPrice": null,
    "customLogo": false,
    "customBadge": "",
    "categoryName": "Player Version",
    "preorderStatus": "OPEN",
    "updatedAt": "2026-11-13T16:11:44.031Z",
    "discountType": "percent",
    "assignedSizes": [
      "sz_s",
      "sz_m",
      "sz_l",
      "sz_xl",
      "sz_xxl",
      "sz_3xl",
      "sz_4xl"
    ],
    "costPrice": 750,
    "discountEnd": null,
    "imageUrl": "img/products/prod_mwf6aps00gxif6hte.jpg",
    "sizeChartImage": "",
    "deliveryChargeInsideDhaka": 80,
    "deliveryChargeOutsideDhaka": 130,
    "team": "Ajax",
    "customNumber": false,
    "assignedSleeves": [
      "slv_half"
    ],
    "compareAt": 1150,
    "preorderCloseDate": null,
    "sizeStocks": {},
    "preorderCapacity": 100,
    "gender": "Unisex",
    "discountValue": null,
    "customName": false,
    "stock": 10,
    "isArchived": false,
    "images": [
      {
        "url": "img/products/prod_mwf6aps00gxif6hte.jpg",
        "alt": "Ajax Third Kit",
        "isPrimary": true
      }
    ],
    "preorderPrice": null,
    "preorderSold": 0,
    "customNameNumber": true,
    "discountStart": null,
    "isPublished": true,
    "seoTitle": "",
    "tax": 0,
    "advancePaymentMode": "cod_only",
    "hasCustomDelivery": false,
    "id": "prod_mwf6aps00gxif6hte",
    "status": "published",
    "preorderDesc": "",
    "createdAt": "2026-11-13T16:10:15.169Z",
    "isFeatured": false,
    "customText": false,
    "sizeMapping": {
      "4XL": {
        "height": 31,
        "width": 46
      },
      "S": {
        "height": 26,
        "width": 36
      },
      "XXL": {
        "width": 44,
        "height": 30
      },
      "M": {
        "height": 27,
        "width": 38
      },
      "XS": {
        "width": 46,
        "height": 31
      },
      "3XL": {
        "height": 31,
        "width": 46
      },
      "L": {
        "width": 40,
        "height": 28
      },
      "XL": {
        "height": 29,
        "width": 42
      }
    },
    "name": "Ajax Third Kit",
    "lowStockAlert": 5,
    "collectionId": null,
    "basePrice": 1150,
    "sport": "Football",
    "salePrice": 999,
    "expectedArrival": null,
    "image": "img/products/prod_mwf6aps00gxif6hte.jpg",
    "subcategoryId": "mw88n5w90qabal7hw"
  },
  {
    "categoryName": "Player Version",
    "id": "prod_mwf67ddftk798pa9k",
    "isLimited": true,
    "isArchived": false,
    "customName": false,
    "discountType": "percent",
    "description": "* সরাসরি চায়না থেকে ইমপোর্ট করা শতভাগ প্রিমিয়াম কোয়ালিটির অথেনটিক প্লেয়ার ভার্সন জার্সি।\n* অত্যন্ত হালকা, স্ট্রেচেবল এবং বাতাস চলাচলের উপযোগী ফেব্রিক দিয়ে তৈরি।\n* ক্লাব লোগো, ব্র্যান্ড লোগো এবং স্পনসর প্রিন্ট নিখুঁত ও টেকসই হিট-প্রেসড প্রযুক্তিতে বসানো।\n* প্লেয়ারদের জার্সির মতো বডি-হাগিং অ্যাথলেটিক স্লিম ফিট ও নিখুঁত সেলাইয়ের ফিনিশিং।\n* নিয়মিত খেলাধুলা কিংবা ক্যাজুয়াল আউটফিট হিসেবে পরার জন্য অত্যন্ত আরামদায়ক ও আকর্ষণীয়।",
    "sizeStocks": {},
    "lowStockAlert": 5,
    "preorderStatus": "OPEN",
    "shortDesc": "চায়না থেকে Imported অথেনটিক Player Version জার্সি",
    "subcategoryId": "mw88n5w90qabal7hw",
    "sizeChartImage": "",
    "customNumber": false,
    "assignedSleeves": [
      "slv_half"
    ],
    "advancePaymentMode": "cod_only",
    "deliveryChargeOutsideDhaka": 130,
    "assignedPatches": [],
    "customNameNumber": true,
    "compareAt": 1150,
    "name": "Juventus Away Kit",
    "customText": false,
    "sku": "ZNV-MWF68DNX",
    "isFeatured": false,
    "discountValue": null,
    "costPrice": 750,
    "preorderPrice": null,
    "updatedAt": "2026-11-13T16:08:26.217Z",
    "isNewArrival": false,
    "deliveryNote": "",
    "preorderCloseDate": null,
    "preorderCapacity": 100,
    "discountEnd": null,
    "seoTitle": "",
    "discountStart": null,
    "isBestSeller": false,
    "customBadge": "",
    "isPublished": true,
    "assignedSizes": [
      "sz_s",
      "sz_m",
      "sz_l",
      "sz_xl",
      "sz_xxl",
      "sz_3xl",
      "sz_4xl"
    ],
    "preorderDesc": "",
    "seoDesc": "",
    "isDeliveryChargeMandatory": false,
    "collectionId": null,
    "tax": 0,
    "categoryId": "cat_mens_football",
    "slug": "juventus-away-kit",
    "image": "img/products/prod_mwf67ddftk798pa9k.jpg",
    "sport": "Football",
    "images": [
      {
        "url": "img/products/prod_mwf67ddftk798pa9k.jpg",
        "alt": "Juventus Away Kit",
        "isPrimary": true
      }
    ],
    "expectedArrival": null,
    "isPreorder": false,
    "gender": "Unisex",
    "team": "Juventus",
    "stock": 10,
    "customPrintPrice": null,
    "salePrice": 999,
    "basePrice": 1150,
    "hasCustomDelivery": false,
    "sizeChartType": "Player Edition",
    "customLogo": false,
    "deliveryChargeInsideDhaka": 80,
    "createdAt": "2026-11-13T16:07:39.123Z",
    "status": "published",
    "sizeMapping": {
      "4XL": {
        "width": 46,
        "height": 31
      },
      "M": {
        "height": 27,
        "width": 38
      },
      "L": {
        "width": 40,
        "height": 28
      },
      "S": {
        "width": 36,
        "height": 26
      },
      "XL": {
        "width": 42,
        "height": 29
      },
      "XXL": {
        "width": 44,
        "height": 30
      },
      "XS": {
        "width": 46,
        "height": 31
      },
      "3XL": {
        "height": 31,
        "width": 46
      }
    },
    "imageUrl": "img/products/prod_mwf67ddftk798pa9k.jpg",
    "preorderSold": 0,
    "expectedDelivery": null
  },
  {
    "sizeMapping": {
      "XXL": {
        "width": 44,
        "height": 30
      },
      "3XL": {
        "width": 46,
        "height": 31
      },
      "S": {
        "width": 36,
        "height": 26
      },
      "XS": {
        "width": 46,
        "height": 31
      },
      "4XL": {
        "width": 46,
        "height": 31
      },
      "L": {
        "width": 40,
        "height": 28
      },
      "XL": {
        "width": 42,
        "height": 29
      },
      "M": {
        "width": 38,
        "height": 27
      }
    },
    "preorderPrice": null,
    "assignedSleeves": [
      "slv_half"
    ],
    "sizeChartImage": "",
    "updatedAt": "2026-11-12T20:34:11.787Z",
    "costPrice": 750,
    "discountStart": null,
    "preorderSold": 0,
    "preorderStatus": "OPEN",
    "status": "published",
    "compareAt": 1150,
    "sizeStocks": {},
    "isArchived": false,
    "hasCustomDelivery": false,
    "customName": false,
    "discountValue": null,
    "lowStockAlert": 5,
    "advancePaymentMode": "cod_only",
    "subcategoryId": "mw88n5w90qabal7hw",
    "collectionId": null,
    "shortDesc": "চায়না থেকে Imported অথেনটিক Player Version জার্সি",
    "preorderCapacity": 100,
    "tax": 0,
    "name": "Borussia Dortmund Away Kit",
    "customNameNumber": true,
    "customText": false,
    "isFeatured": false,
    "isPublished": true,
    "gender": "Unisex",
    "assignedPatches": [],
    "seoTitle": "",
    "isLimited": true,
    "images": [
      {
        "url": "img/products/prod_mwe087k8n71j75nf0.jpg",
        "alt": "Borussia Dortmund Away Kit",
        "isPrimary": true
      }
    ],
    "preorderDesc": "",
    "isPreorder": false,
    "expectedArrival": null,
    "isBestSeller": false,
    "preorderCloseDate": null,
    "createdAt": "2026-11-12T20:32:34.376Z",
    "customBadge": "",
    "categoryId": "cat_mens_football",
    "discountEnd": null,
    "seoDesc": "",
    "deliveryNote": "",
    "isNewArrival": false,
    "slug": "borussia-dortmund-away-kit",
    "deliveryChargeOutsideDhaka": 130,
    "sku": "ZNV-MWE0AAOM",
    "salePrice": 999,
    "stock": 10,
    "sizeChartType": "Player Edition",
    "isDeliveryChargeMandatory": false,
    "basePrice": 1150,
    "deliveryChargeInsideDhaka": 80,
    "sport": "Football",
    "customNumber": false,
    "team": "Borussia Dortmund",
    "expectedDelivery": null,
    "image": "img/products/prod_mwe087k8n71j75nf0.jpg",
    "imageUrl": "img/products/prod_mwe087k8n71j75nf0.jpg",
    "assignedSizes": [
      "sz_s",
      "sz_m",
      "sz_l",
      "sz_xl",
      "sz_xxl",
      "sz_3xl",
      "sz_4xl"
    ],
    "customPrintPrice": null,
    "customLogo": false,
    "categoryName": "Player Version",
    "discountType": "percent",
    "description": "* সরাসরি চায়না থেকে ইমপোর্ট করা শতভাগ প্রিমিয়াম কোয়ালিটির অথেনটিক প্লেয়ার ভার্সন জার্সি।\n* অত্যন্ত হালকা, স্ট্রেচেবল এবং বাতাস চলাচলের উপযোগী ফেব্রিক দিয়ে তৈরি।\n* ক্লাব লোগো, ব্র্যান্ড লোগো এবং স্পনসর প্রিন্ট নিখুঁত ও টেকসই হিট-প্রেসড প্রযুক্তিতে বসানো।\n* প্লেয়ারদের জার্সির মতো বডি-হাগিং অ্যাথলেটিক স্লিম ফিট ও নিখুঁত সেলাইয়ের ফিনিশিং।\n* নিয়মিত খেলাধুলা কিংবা ক্যাজুয়াল আউটফিট হিসেবে পরার জন্য অত্যন্ত আরামদায়ক ও আকর্ষণীয়।",
    "id": "prod_mwe087k8n71j75nf0"
  },
  {
    "preorderCapacity": 100,
    "hasCustomDelivery": false,
    "categoryId": "cat_mens_football",
    "compareAt": 1150,
    "assignedPatches": [],
    "isPreorder": false,
    "assignedSizes": [
      "sz_s",
      "sz_m",
      "sz_l",
      "sz_xl",
      "sz_xxl",
      "sz_3xl",
      "sz_4xl"
    ],
    "seoTitle": "",
    "isPublished": true,
    "team": "Atletico Madrid",
    "gender": "Unisex",
    "stock": 10,
    "customNameNumber": true,
    "images": [
      {
        "url": "img/products/prod_mwe01c9fwsp7p0fbh.jpg",
        "alt": "Atletico Madrid Away Kit",
        "isPrimary": true
      }
    ],
    "updatedAt": "2026-11-12T20:34:17.695Z",
    "preorderSold": 0,
    "costPrice": 750,
    "seoDesc": "",
    "slug": "atletico-madrid-away-kit",
    "sport": "Football",
    "sizeChartType": "Player Edition",
    "sizeMapping": {
      "M": {
        "height": 27,
        "width": 38
      },
      "XL": {
        "width": 42,
        "height": 29
      },
      "3XL": {
        "height": 31,
        "width": 46
      },
      "L": {
        "height": 28,
        "width": 40
      },
      "XXL": {
        "height": 30,
        "width": 44
      },
      "XS": {
        "width": 46,
        "height": 31
      },
      "S": {
        "width": 36,
        "height": 26
      },
      "4XL": {
        "width": 46,
        "height": 31
      }
    },
    "image": "img/products/prod_mwe01c9fwsp7p0fbh.jpg",
    "isLimited": true,
    "preorderDesc": "",
    "status": "published",
    "assignedSleeves": [
      "slv_half"
    ],
    "shortDesc": "চায়না থেকে Imported অথেনটিক Player Version জার্সি",
    "collectionId": null,
    "tax": 0,
    "customLogo": false,
    "sku": "ZNV-MWE05I8L",
    "isDeliveryChargeMandatory": false,
    "expectedDelivery": null,
    "basePrice": 1150,
    "salePrice": 999,
    "customName": false,
    "sizeChartImage": "",
    "isArchived": false,
    "advancePaymentMode": "cod_only",
    "isBestSeller": false,
    "subcategoryId": "mw88n5w90qabal7hw",
    "sizeStocks": {},
    "description": "* সরাসরি চায়না থেকে ইমপোর্ট করা শতভাগ প্রিমিয়াম কোয়ালিটির অথেনটিক প্লেয়ার ভার্সন জার্সি।\n* অত্যন্ত হালকা, স্ট্রেচেবল এবং বাতাস চলাচলের উপযোগী ফেব্রিক দিয়ে তৈরি।\n* ক্লাব লোগো, ব্র্যান্ড লোগো এবং স্পনসর প্রিন্ট নিখুঁত ও টেকসই হিট-প্রেসড প্রযুক্তিতে বসানো।\n* প্লেয়ারদের জার্সির মতো বডি-হাগিং অ্যাথলেটিক স্লিম ফিট ও নিখুঁত সেলাইয়ের ফিনিশিং।\n* নিয়মিত খেলাধুলা কিংবা ক্যাজুয়াল আউটফিট হিসেবে পরার জন্য অত্যন্ত আরামদায়ক ও আকর্ষণীয়।",
    "imageUrl": "img/products/prod_mwe01c9fwsp7p0fbh.jpg",
    "id": "prod_mwe01c9fwsp7p0fbh",
    "lowStockAlert": 5,
    "customPrintPrice": null,
    "preorderStatus": "OPEN",
    "createdAt": "2026-11-12T20:27:13.875Z",
    "preorderCloseDate": null,
    "name": "Atletico Madrid Away Kit",
    "deliveryChargeOutsideDhaka": 130,
    "deliveryNote": "",
    "isNewArrival": false,
    "discountValue": null,
    "discountEnd": null,
    "categoryName": "Player Version",
    "discountType": "percent",
    "customBadge": "",
    "discountStart": null,
    "expectedArrival": null,
    "customNumber": false,
    "isFeatured": false,
    "customText": false,
    "deliveryChargeInsideDhaka": 80,
    "preorderPrice": null
  },
  {
    "preorderDesc": "",
    "imageUrl": "img/products/prod_mwdzvb65s2tv6g5iv.jpg",
    "isFeatured": false,
    "advancePaymentMode": "cod_only",
    "customText": false,
    "updatedAt": "2026-11-12T20:23:09.709Z",
    "costPrice": 750,
    "image": "img/products/prod_mwdzvb65s2tv6g5iv.jpg",
    "compareAt": 1150,
    "isDeliveryChargeMandatory": false,
    "assignedSizes": [
      "sz_s",
      "sz_m",
      "sz_l",
      "sz_xl",
      "sz_xxl",
      "sz_3xl",
      "sz_4xl"
    ],
    "sizeMapping": {
      "M": {
        "width": 38,
        "height": 27
      },
      "XL": {
        "width": 42,
        "height": 29
      },
      "4XL": {
        "width": 46,
        "height": 31
      },
      "L": {
        "width": 40,
        "height": 28
      },
      "XS": {
        "width": 46,
        "height": 31
      },
      "3XL": {
        "height": 31,
        "width": 46
      },
      "S": {
        "height": 26,
        "width": 36
      },
      "XXL": {
        "width": 44,
        "height": 30
      }
    },
    "collectionId": null,
    "sport": "Football",
    "preorderCloseDate": null,
    "customName": false,
    "isArchived": false,
    "name": "Mancester United Third Kit",
    "stock": 10,
    "sizeStocks": {},
    "shortDesc": "চায়না থেকে Imported অথেনটিক Player Version জার্সি",
    "deliveryChargeInsideDhaka": 80,
    "expectedDelivery": null,
    "isPublished": true,
    "sizeChartImage": "",
    "sizeChartType": "Player Edition",
    "customPrintPrice": null,
    "expectedArrival": null,
    "sku": "ZNV-MWDZW3T6",
    "preorderStatus": "OPEN",
    "preorderSold": 0,
    "isLimited": true,
    "seoTitle": "",
    "images": [
      {
        "url": "img/products/prod_mwdzvb65s2tv6g5iv.jpg",
        "alt": "Mancester United Third Kit",
        "isPrimary": true
      }
    ],
    "hasCustomDelivery": false,
    "tax": 0,
    "subcategoryId": "mw88n5w90qabal7hw",
    "gender": "Unisex",
    "seoDesc": "",
    "discountType": "percent",
    "lowStockAlert": 5,
    "assignedPatches": [
      "patch_ucl"
    ],
    "createdAt": "2026-11-12T20:22:32.525Z",
    "customLogo": false,
    "categoryName": "Player Version",
    "customNumber": false,
    "discountEnd": null,
    "customBadge": "",
    "id": "prod_mwdzvb65s2tv6g5iv",
    "basePrice": 1150,
    "slug": "mancester-united-third-kit",
    "salePrice": 999,
    "description": "* সরাসরি চায়না থেকে ইমপোর্ট করা শতভাগ প্রিমিয়াম কোয়ালিটির অথেনটিক প্লেয়ার ভার্সন জার্সি।\n* অত্যন্ত হালকা, স্ট্রেচেবল এবং বাতাস চলাচলের উপযোগী ফেব্রিক দিয়ে তৈরি।\n* ক্লাব লোগো, ব্র্যান্ড লোগো এবং স্পনসর প্রিন্ট নিখুঁত ও টেকসই হিট-প্রেসড প্রযুক্তিতে বসানো।\n* প্লেয়ারদের জার্সির মতো বডি-হাগিং অ্যাথলেটিক স্লিম ফিট ও নিখুঁত সেলাইয়ের ফিনিশিং।\n* নিয়মিত খেলাধুলা কিংবা ক্যাজুয়াল আউটফিট হিসেবে পরার জন্য অত্যন্ত আরামদায়ক ও আকর্ষণীয়।",
    "discountStart": null,
    "team": "Man United",
    "preorderPrice": null,
    "preorderCapacity": 100,
    "status": "published",
    "assignedSleeves": [
      "slv_half"
    ],
    "isBestSeller": false,
    "discountValue": null,
    "categoryId": "cat_mens_football",
    "customNameNumber": true,
    "deliveryChargeOutsideDhaka": 130,
    "deliveryNote": "",
    "isNewArrival": false,
    "isPreorder": false
  },
  {
    "name": "Mancester United Away Kit",
    "discountType": "percent",
    "tax": 0,
    "shortDesc": "চায়না থেকে Imported অথেনটিক Player Version জার্সি",
    "categoryName": "Player Version",
    "sizeChartImage": "",
    "images": [
      {
        "url": "img/products/prod_mwdzuhqo33wb2zexr.jpg",
        "alt": "Mancester United Away Kit",
        "isPrimary": true
      }
    ],
    "advancePaymentMode": "cod_only",
    "seoTitle": "",
    "isLimited": true,
    "lowStockAlert": 5,
    "gender": "Unisex",
    "isDeliveryChargeMandatory": false,
    "preorderStatus": "OPEN",
    "subcategoryId": "mw88n5w90qabal7hw",
    "customNumber": false,
    "isFeatured": false,
    "customText": false,
    "description": "* সরাসরি চায়না থেকে ইমপোর্ট করা শতভাগ প্রিমিয়াম কোয়ালিটির অথেনটিক প্লেয়ার ভার্সন জার্সি।\n* অত্যন্ত হালকা, স্ট্রেচেবল এবং বাতাস চলাচলের উপযোগী ফেব্রিক দিয়ে তৈরি।\n* ক্লাব লোগো, ব্র্যান্ড লোগো এবং স্পনসর প্রিন্ট নিখুঁত ও টেকসই হিট-প্রেসড প্রযুক্তিতে বসানো।\n* প্লেয়ারদের জার্সির মতো বডি-হাগিং অ্যাথলেটিক স্লিম ফিট ও নিখুঁত সেলাইয়ের ফিনিশিং।\n* নিয়মিত খেলাধুলা কিংবা ক্যাজুয়াল আউটফিট হিসেবে পরার জন্য অত্যন্ত আরামদায়ক ও আকর্ষণীয়।",
    "preorderCloseDate": null,
    "costPrice": 750,
    "updatedAt": "2026-11-12T20:22:29.677Z",
    "deliveryChargeInsideDhaka": 80,
    "customBadge": "",
    "expectedDelivery": null,
    "expectedArrival": null,
    "discountValue": null,
    "discountEnd": null,
    "deliveryNote": "",
    "isNewArrival": false,
    "preorderPrice": null,
    "customName": false,
    "isArchived": false,
    "customPrintPrice": null,
    "isBestSeller": false,
    "sizeStocks": {},
    "compareAt": 1150,
    "discountStart": null,
    "status": "published",
    "assignedSizes": [
      "sz_s",
      "sz_m",
      "sz_l",
      "sz_xl",
      "sz_xxl",
      "sz_3xl",
      "sz_4xl"
    ],
    "preorderDesc": "",
    "image": "img/products/prod_mwdzuhqo33wb2zexr.jpg",
    "team": "Man United",
    "sport": "Football",
    "deliveryChargeOutsideDhaka": 130,
    "assignedPatches": [
      "patch_ucl"
    ],
    "id": "prod_mwdzuhqo33wb2zexr",
    "isPublished": true,
    "collectionId": null,
    "customLogo": false,
    "imageUrl": "img/products/prod_mwdzuhqo33wb2zexr.jpg",
    "seoDesc": "",
    "sizeMapping": {
      "XL": {
        "height": 29,
        "width": 42
      },
      "L": {
        "width": 40,
        "height": 28
      },
      "XS": {
        "height": 31,
        "width": 46
      },
      "4XL": {
        "height": 31,
        "width": 46
      },
      "M": {
        "height": 27,
        "width": 38
      },
      "3XL": {
        "width": 46,
        "height": 31
      },
      "XXL": {
        "width": 44,
        "height": 30
      },
      "S": {
        "height": 26,
        "width": 36
      }
    },
    "categoryId": "cat_mens_football",
    "createdAt": "2026-11-12T20:21:54.384Z",
    "sizeChartType": "Player Edition",
    "preorderCapacity": 100,
    "assignedSleeves": [
      "slv_half"
    ],
    "isPreorder": false,
    "customNameNumber": true,
    "basePrice": 1150,
    "preorderSold": 0,
    "stock": 10,
    "salePrice": 999,
    "hasCustomDelivery": false,
    "sku": "ZNV-MWDZV8X5",
    "slug": "mancester-united-away-kit"
  },
  {
    "seoTitle": "",
    "customLogo": false,
    "discountValue": null,
    "status": "published",
    "stock": 10,
    "customBadge": "",
    "hasCustomDelivery": false,
    "discountEnd": null,
    "discountStart": null,
    "assignedPatches": [
      "patch_ucl"
    ],
    "deliveryNote": "",
    "isNewArrival": false,
    "preorderPrice": null,
    "slug": "mancester-united-home-kit",
    "isBestSeller": false,
    "id": "prod_mwdzs36rkf46yv452",
    "categoryName": "Player Version",
    "customPrintPrice": null,
    "discountType": "percent",
    "assignedSleeves": [
      "slv_half"
    ],
    "images": [
      {
        "url": "img/products/prod_mwdzs36rkf46yv452.jpg",
        "alt": "Mancester United Home Kit",
        "isPrimary": true
      }
    ],
    "team": "Man United",
    "deliveryChargeOutsideDhaka": 130,
    "gender": "Unisex",
    "createdAt": "2026-11-12T20:20:02.212Z",
    "image": "img/products/prod_mwdzs36rkf46yv452.jpg",
    "subcategoryId": "mw88n5w90qabal7hw",
    "isPreorder": false,
    "tax": 0,
    "categoryId": "cat_mens_football",
    "basePrice": 1150,
    "description": "* সরাসরি চায়না থেকে ইমপোর্ট করা শতভাগ প্রিমিয়াম কোয়ালিটির অথেনটিক প্লেয়ার ভার্সন জার্সি।\n* অত্যন্ত হালকা, স্ট্রেচেবল এবং বাতাস চলাচলের উপযোগী ফেব্রিক দিয়ে তৈরি।\n* ক্লাব লোগো, ব্র্যান্ড লোগো এবং স্পনসর প্রিন্ট নিখুঁত ও টেকসই হিট-প্রেসড প্রযুক্তিতে বসানো।\n* প্লেয়ারদের জার্সির মতো বডি-হাগিং অ্যাথলেটিক স্লিম ফিট ও নিখুঁত সেলাইয়ের ফিনিশিং।\n* নিয়মিত খেলাধুলা কিংবা ক্যাজুয়াল আউটফিট হিসেবে পরার জন্য অত্যন্ত আরামদায়ক ও আকর্ষণীয়।",
    "expectedDelivery": null,
    "lowStockAlert": 5,
    "sport": "Football",
    "customNumber": false,
    "salePrice": 999,
    "isFeatured": false,
    "sizeMapping": {
      "XL": {
        "width": 42,
        "height": 29
      },
      "M": {
        "width": 38,
        "height": 27
      },
      "4XL": {
        "width": 46,
        "height": 31
      },
      "XS": {
        "height": 31,
        "width": 46
      },
      "L": {
        "height": 28,
        "width": 40
      },
      "3XL": {
        "width": 46,
        "height": 31
      },
      "S": {
        "width": 36,
        "height": 26
      },
      "XXL": {
        "width": 44,
        "height": 30
      }
    },
    "customText": false,
    "sizeChartType": "Player Edition",
    "sku": "ZNV-MWDZTXQ5",
    "seoDesc": "",
    "deliveryChargeInsideDhaka": 80,
    "shortDesc": "চায়না থেকে Imported অথেনটিক Player Version জার্সি",
    "imageUrl": "img/products/prod_mwdzs36rkf46yv452.jpg",
    "preorderCloseDate": null,
    "preorderSold": 0,
    "advancePaymentMode": "cod_only",
    "isLimited": true,
    "sizeStocks": {},
    "name": "Mancester United Home Kit",
    "preorderDesc": "",
    "customNameNumber": true,
    "customName": false,
    "isArchived": false,
    "assignedSizes": [
      "sz_s",
      "sz_m",
      "sz_l",
      "sz_xl",
      "sz_xxl",
      "sz_3xl",
      "sz_4xl"
    ],
    "costPrice": 750,
    "updatedAt": "2026-11-12T20:21:28.505Z",
    "expectedArrival": null,
    "sizeChartImage": "",
    "collectionId": null,
    "compareAt": 1150,
    "isPublished": true,
    "isDeliveryChargeMandatory": false,
    "preorderCapacity": 100,
    "preorderStatus": "OPEN"
  },
  {
    "sport": "Football",
    "preorderPrice": null,
    "preorderStatus": "OPEN",
    "sizeStocks": {},
    "sizeChartImage": "",
    "isNewArrival": false,
    "assignedPatches": [],
    "expectedDelivery": null,
    "team": "Inter Miami",
    "seoDesc": "",
    "lowStockAlert": 5,
    "sizeMapping": {
      "S": {
        "width": 36,
        "height": 26
      },
      "XS": {
        "width": 46,
        "height": 31
      },
      "4XL": {
        "width": 46,
        "height": 31
      },
      "L": {
        "width": 40,
        "height": 28
      },
      "XL": {
        "width": 42,
        "height": 29
      },
      "XXL": {
        "height": 30,
        "width": 44
      },
      "M": {
        "width": 38,
        "height": 27
      },
      "3XL": {
        "width": 46,
        "height": 31
      }
    },
    "gender": "Unisex",
    "preorderCapacity": 100,
    "tax": 0,
    "isLimited": true,
    "deliveryChargeOutsideDhaka": 130,
    "assignedSleeves": [
      "slv_half"
    ],
    "basePrice": 1150,
    "assignedSizes": [
      "sz_s",
      "sz_m",
      "sz_l",
      "sz_xl",
      "sz_xxl",
      "sz_3xl",
      "sz_4xl"
    ],
    "status": "published",
    "compareAt": 1150,
    "discountValue": null,
    "customBadge": "",
    "hasCustomDelivery": false,
    "customPrintPrice": null,
    "images": [
      {
        "url": "img/products/prod_mwdzp9ss9ctsb7vqz.jpg",
        "alt": "Inter Miami Away kit",
        "isPrimary": true
      }
    ],
    "description": "* সরাসরি চায়না থেকে ইমপোর্ট করা শতভাগ প্রিমিয়াম কোয়ালিটির অথেনটিক প্লেয়ার ভার্সন জার্সি।\n* অত্যন্ত হালকা, স্ট্রেচেবল এবং বাতাস চলাচলের উপযোগী ফেব্রিক দিয়ে তৈরি।\n* ক্লাব লোগো, ব্র্যান্ড লোগো এবং স্পনসর প্রিন্ট নিখুঁত ও টেকসই হিট-প্রেসড প্রযুক্তিতে বসানো।\n* প্লেয়ারদের জার্সির মতো বডি-হাগিং অ্যাথলেটিক স্লিম ফিট ও নিখুঁত সেলাইয়ের ফিনিশিং।\n* নিয়মিত খেলাধুলা কিংবা ক্যাজুয়াল আউটফিট হিসেবে পরার জন্য অত্যন্ত আরামদায়ক ও আকর্ষণীয়।",
    "isPublished": true,
    "image": "img/products/prod_mwdzp9ss9ctsb7vqz.jpg",
    "discountEnd": null,
    "name": "Inter Miami Away kit",
    "isDeliveryChargeMandatory": false,
    "subcategoryId": "mw88n5w90qabal7hw",
    "categoryId": "cat_mens_football",
    "costPrice": 750,
    "customNameNumber": true,
    "sizeChartType": "Player Edition",
    "isPreorder": false,
    "seoTitle": "",
    "id": "prod_mwdzp9ss9ctsb7vqz",
    "deliveryNote": "",
    "customNumber": false,
    "discountType": "percent",
    "isArchived": false,
    "slug": "inter-miami-away-kit",
    "stock": 10,
    "preorderSold": 0,
    "sku": "ZNV-MWDZRLBN",
    "customText": false,
    "shortDesc": "চায়না থেকে Imported অথেনটিক Player Version জার্সি",
    "expectedArrival": null,
    "isFeatured": false,
    "preorderDesc": "",
    "deliveryChargeInsideDhaka": 80,
    "discountStart": null,
    "isBestSeller": false,
    "customName": false,
    "salePrice": 999,
    "customLogo": false,
    "createdAt": "2026-11-12T20:17:50.813Z",
    "imageUrl": "img/products/prod_mwdzp9ss9ctsb7vqz.jpg",
    "preorderCloseDate": null,
    "updatedAt": "2026-11-12T20:19:39.120Z",
    "categoryName": "Player Version",
    "collectionId": null,
    "advancePaymentMode": "cod_only"
  },
  {
    "discountValue": null,
    "salePrice": 999,
    "sku": "ZNV-MWDZNU33",
    "customNumber": false,
    "deliveryNote": "",
    "gender": "Unisex",
    "sizeStocks": {},
    "discountType": "percent",
    "hasCustomDelivery": false,
    "preorderSold": 0,
    "subcategoryId": "mw88n5w90qabal7hw",
    "updatedAt": "2026-11-12T20:17:45.624Z",
    "deliveryChargeInsideDhaka": 80,
    "seoTitle": "",
    "createdAt": "2026-11-12T20:15:18.463Z",
    "sizeChartType": "Player Edition",
    "sizeMapping": {
      "4XL": {
        "width": 46,
        "height": 31
      },
      "M": {
        "height": 27,
        "width": 38
      },
      "XL": {
        "height": 29,
        "width": 42
      },
      "3XL": {
        "width": 46,
        "height": 31
      },
      "L": {
        "width": 40,
        "height": 28
      },
      "XS": {
        "height": 31,
        "width": 46
      },
      "S": {
        "width": 36,
        "height": 26
      },
      "XXL": {
        "height": 30,
        "width": 44
      }
    },
    "team": "Inter Miami",
    "image": "img/products/prod_mwdzm08vaxzqhjps3.jpg",
    "advancePaymentMode": "cod_only",
    "discountEnd": null,
    "preorderPrice": null,
    "preorderDesc": "",
    "name": "Inter Miami Third kit",
    "isBestSeller": false,
    "imageUrl": "img/products/prod_mwdzm08vaxzqhjps3.jpg",
    "lowStockAlert": 5,
    "deliveryChargeOutsideDhaka": 130,
    "images": [
      {
        "url": "img/products/prod_mwdzm08vaxzqhjps3.jpg",
        "alt": "Inter Miami Away kit",
        "isPrimary": true
      }
    ],
    "isPreorder": false,
    "sport": "Football",
    "shortDesc": "চায়না থেকে Imported অথেনটিক Player Version জার্সি",
    "collectionId": null,
    "status": "published",
    "customBadge": "",
    "categoryId": "cat_mens_football",
    "description": "* সরাসরি চায়না থেকে ইমপোর্ট করা শতভাগ প্রিমিয়াম কোয়ালিটির অথেনটিক প্লেয়ার ভার্সন জার্সি।\n* অত্যন্ত হালকা, স্ট্রেচেবল এবং বাতাস চলাচলের উপযোগী ফেব্রিক দিয়ে তৈরি।\n* ক্লাব লোগো, ব্র্যান্ড লোগো এবং স্পনসর প্রিন্ট নিখুঁত ও টেকসই হিট-প্রেসড প্রযুক্তিতে বসানো।\n* প্লেয়ারদের জার্সির মতো বডি-হাগিং অ্যাথলেটিক স্লিম ফিট ও নিখুঁত সেলাইয়ের ফিনিশিং।\n* নিয়মিত খেলাধুলা কিংবা ক্যাজুয়াল আউটফিট হিসেবে পরার জন্য অত্যন্ত আরামদায়ক ও আকর্ষণীয়।",
    "expectedArrival": null,
    "isPublished": true,
    "categoryName": "Player Version",
    "seoDesc": "",
    "assignedSizes": [
      "sz_s",
      "sz_m",
      "sz_l",
      "sz_xl",
      "sz_xxl",
      "sz_3xl",
      "sz_4xl"
    ],
    "expectedDelivery": null,
    "isNewArrival": false,
    "discountStart": null,
    "isArchived": false,
    "slug": "inter-miami-third-kit",
    "isDeliveryChargeMandatory": false,
    "compareAt": 1150,
    "tax": 0,
    "preorderStatus": "OPEN",
    "isFeatured": false,
    "preorderCloseDate": null,
    "customText": false,
    "sizeChartImage": "",
    "costPrice": 750,
    "preorderCapacity": 100,
    "customPrintPrice": null,
    "stock": 10,
    "customName": false,
    "assignedPatches": [],
    "basePrice": 1150,
    "customNameNumber": true,
    "id": "prod_mwdzm08vaxzqhjps3",
    "isLimited": true,
    "assignedSleeves": [
      "slv_half"
    ],
    "customLogo": false
  },
  {
    "costPrice": 750,
    "customNameNumber": true,
    "sport": "Football",
    "preorderSold": 0,
    "discountStart": null,
    "discountEnd": null,
    "customName": false,
    "isPublished": true,
    "customPrintPrice": null,
    "description": "* সরাসরি চায়না থেকে ইমপোর্ট করা শতভাগ প্রিমিয়াম কোয়ালিটির অথেনটিক প্লেয়ার ভার্সন জার্সি।\n* অত্যন্ত হালকা, স্ট্রেচেবল এবং বাতাস চলাচলের উপযোগী ফেব্রিক দিয়ে তৈরি।\n* ক্লাব লোগো, ব্র্যান্ড লোগো এবং স্পনসর প্রিন্ট নিখুঁত ও টেকসই হিট-প্রেসড প্রযুক্তিতে বসানো।\n* প্লেয়ারদের জার্সির মতো বডি-হাগিং অ্যাথলেটিক স্লিম ফিট ও নিখুঁত সেলাইয়ের ফিনিশিং।\n* নিয়মিত খেলাধুলা কিংবা ক্যাজুয়াল আউটফিট হিসেবে পরার জন্য অত্যন্ত আরামদায়ক ও আকর্ষণীয়।",
    "customLogo": false,
    "discountType": "percent",
    "preorderCloseDate": null,
    "customBadge": "",
    "compareAt": 1150,
    "customNumber": false,
    "deliveryNote": "",
    "sku": "ZNV-MWDZLWYX",
    "collectionId": null,
    "isLimited": true,
    "categoryName": "Player Version",
    "image": "img/products/prod_mwdzkir4mnoj7j1g6.jpg",
    "basePrice": 1150,
    "preorderCapacity": 100,
    "isArchived": false,
    "expectedDelivery": null,
    "sizeChartImage": "",
    "isBestSeller": false,
    "slug": "inter-miami-home-kit",
    "sizeMapping": {
      "4XL": {
        "width": 46,
        "height": 31
      },
      "M": {
        "height": 27,
        "width": 38
      },
      "3XL": {
        "height": 31,
        "width": 46
      },
      "XL": {
        "width": 42,
        "height": 29
      },
      "S": {
        "width": 36,
        "height": 26
      },
      "XS": {
        "width": 46,
        "height": 31
      },
      "L": {
        "width": 40,
        "height": 28
      },
      "XXL": {
        "height": 30,
        "width": 44
      }
    },
    "seoDesc": "",
    "expectedArrival": null,
    "advancePaymentMode": "cod_only",
    "preorderStatus": "OPEN",
    "isDeliveryChargeMandatory": false,
    "customText": false,
    "isFeatured": false,
    "preorderDesc": "",
    "createdAt": "2026-11-12T20:14:09.136Z",
    "discountValue": null,
    "id": "prod_mwdzkir4mnoj7j1g6",
    "updatedAt": "2026-11-12T20:15:14.265Z",
    "hasCustomDelivery": false,
    "sizeChartType": "Player Edition",
    "name": "Inter Miami Home kit",
    "tax": 0,
    "images": [
      {
        "url": "img/products/prod_mwdzkir4mnoj7j1g6.jpg",
        "alt": "Inter Miami Home kit",
        "isPrimary": true
      }
    ],
    "categoryId": "cat_mens_football",
    "stock": 10,
    "salePrice": 999,
    "isNewArrival": false,
    "isPreorder": false,
    "subcategoryId": "mw88n5w90qabal7hw",
    "status": "published",
    "seoTitle": "",
    "sizeStocks": {},
    "deliveryChargeOutsideDhaka": 130,
    "lowStockAlert": 5,
    "assignedPatches": [],
    "deliveryChargeInsideDhaka": 80,
    "team": "Inter Miami",
    "gender": "Unisex",
    "imageUrl": "img/products/prod_mwdzkir4mnoj7j1g6.jpg",
    "shortDesc": "চায়না থেকে Imported অথেনটিক Player Version জার্সি",
    "preorderPrice": null,
    "assignedSizes": [
      "sz_s",
      "sz_m",
      "sz_l",
      "sz_xl",
      "sz_xxl",
      "sz_3xl",
      "sz_4xl"
    ],
    "assignedSleeves": [
      "slv_half"
    ]
  },
  {
    "salePrice": 999,
    "categoryId": "cat_mens_football",
    "discountType": "percent",
    "gender": "Unisex",
    "expectedDelivery": null,
    "stock": 10,
    "isPreorder": false,
    "deliveryNote": "",
    "discountStart": null,
    "id": "prod_mwdze6yw9wzww94nq",
    "customNumber": false,
    "updatedAt": "2026-11-12T20:13:18.559Z",
    "name": "Al Nasser Third Kit",
    "seoTitle": "",
    "preorderSold": 0,
    "preorderCapacity": 100,
    "createdAt": "2026-11-12T20:09:13.928Z",
    "team": "Al Nasser",
    "expectedArrival": null,
    "deliveryChargeOutsideDhaka": 130,
    "customPrintPrice": null,
    "isBestSeller": false,
    "preorderDesc": "",
    "imageUrl": "img/products/prod_mwdze6yw9wzww94nq.jpg",
    "hasCustomDelivery": false,
    "isDeliveryChargeMandatory": false,
    "tax": 0,
    "categoryName": "Player Version",
    "status": "published",
    "sizeStocks": {},
    "collectionId": null,
    "customNameNumber": true,
    "shortDesc": "চায়না থেকে Imported অথেনটিক Player Version জার্সি",
    "images": [
      {
        "url": "img/products/prod_mwdze6yw9wzww94nq.jpg",
        "alt": "Al Nasser Third Kit",
        "isPrimary": true
      },
      {
        "url": "data:image/jpeg;base64,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",
        "alt": "Al Nasser Third Kit",
        "isPrimary": false
      }
    ],
    "seoDesc": "",
    "customLogo": false,
    "customBadge": "",
    "discountValue": null,
    "isNewArrival": false,
    "isPublished": true,
    "compareAt": 1150,
    "description": "* সরাসরি চায়না থেকে ইমপোর্ট করা শতভাগ প্রিমিয়াম কোয়ালিটির অথেনটিক প্লেয়ার ভার্সন জার্সি।\n* অত্যন্ত হালকা, স্ট্রেচেবল এবং বাতাস চলাচলের উপযোগী ফেব্রিক দিয়ে তৈরি।\n* ক্লাব লোগো, ব্র্যান্ড লোগো এবং স্পনসর প্রিন্ট নিখুঁত ও টেকসই হিট-প্রেসড প্রযুক্তিতে বসানো।\n* প্লেয়ারদের জার্সির মতো বডি-হাগিং অ্যাথলেটিক স্লিম ফিট ও নিখুঁত সেলাইয়ের ফিনিশিং।\n* নিয়মিত খেলাধুলা কিংবা ক্যাজুয়াল আউটফিট হিসেবে পরার জন্য অত্যন্ত আরামদায়ক ও আকর্ষণীয়।",
    "discountEnd": null,
    "sport": "Football",
    "sizeChartType": "Player Edition",
    "customName": false,
    "costPrice": 750,
    "subcategoryId": "mw88n5w90qabal7hw",
    "lowStockAlert": 5,
    "assignedSleeves": [
      "slv_half"
    ],
    "isFeatured": false,
    "preorderPrice": null,
    "sizeMapping": {
      "3XL": {
        "width": 46,
        "height": 31
      },
      "XXL": {
        "width": 44,
        "height": 30
      },
      "M": {
        "width": 38,
        "height": 27
      },
      "XL": {
        "width": 42,
        "height": 29
      },
      "S": {
        "height": 26,
        "width": 36
      },
      "XS": {
        "height": 31,
        "width": 46
      },
      "L": {
        "width": 40,
        "height": 28
      },
      "4XL": {
        "height": 31,
        "width": 46
      }
    },
    "customText": false,
    "assignedPatches": [],
    "sizeChartImage": "",
    "basePrice": 1150,
    "preorderStatus": "OPEN",
    "assignedSizes": [
      "sz_s",
      "sz_m",
      "sz_l",
      "sz_xl",
      "sz_xxl",
      "sz_3xl",
      "sz_4xl"
    ],
    "preorderCloseDate": null,
    "image": "img/products/prod_mwdze6yw9wzww94nq.jpg",
    "isArchived": false,
    "slug": "al-nasser-third-kit",
    "isLimited": true,
    "advancePaymentMode": "cod_only",
    "sku": "ZNV-MWDZJFP0",
    "deliveryChargeInsideDhaka": 80
  },
  {
    "updatedAt": "2026-11-12T20:08:50.930Z",
    "isNewArrival": false,
    "sport": "Football",
    "hasCustomDelivery": false,
    "customLogo": false,
    "createdAt": "2026-11-12T20:07:57.466Z",
    "seoDesc": "",
    "id": "prod_mwdzcjyygi3k7sd87",
    "deliveryChargeOutsideDhaka": 130,
    "salePrice": 999,
    "customName": false,
    "deliveryChargeInsideDhaka": 80,
    "team": "Al Nasser",
    "isFeatured": false,
    "assignedPatches": [],
    "name": "Al Nasser Away Kit",
    "customText": false,
    "shortDesc": "চায়না থেকে Imported অথেনটিক Player Version জার্সি",
    "image": "img/products/prod_mwdzcjyygi3k7sd87.jpg",
    "discountStart": null,
    "isArchived": false,
    "assignedSleeves": [
      "slv_half"
    ],
    "tax": 0,
    "isPreorder": false,
    "lowStockAlert": 5,
    "slug": "al-nasser-away-kit",
    "discountType": "percent",
    "isDeliveryChargeMandatory": false,
    "sizeMapping": {
      "XL": {
        "height": 29,
        "width": 42
      },
      "XS": {
        "width": 46,
        "height": 31
      },
      "M": {
        "height": 27,
        "width": 38
      },
      "4XL": {
        "height": 31,
        "width": 46
      },
      "L": {
        "width": 40,
        "height": 28
      },
      "XXL": {
        "width": 44,
        "height": 30
      },
      "S": {
        "width": 36,
        "height": 26
      },
      "3XL": {
        "width": 46,
        "height": 31
      }
    },
    "categoryId": "cat_mens_football",
    "customNumber": false,
    "preorderPrice": null,
    "costPrice": 750,
    "preorderCapacity": 100,
    "seoTitle": "",
    "deliveryNote": "",
    "expectedDelivery": null,
    "preorderCloseDate": null,
    "gender": "Unisex",
    "advancePaymentMode": "cod_only",
    "assignedSizes": [
      "sz_s",
      "sz_m",
      "sz_l",
      "sz_xl",
      "sz_xxl",
      "sz_3xl",
      "sz_4xl"
    ],
    "preorderSold": 0,
    "stock": 10,
    "sizeChartImage": "",
    "preorderStatus": "OPEN",
    "compareAt": 1150,
    "isBestSeller": false,
    "basePrice": 1150,
    "status": "published",
    "customNameNumber": true,
    "discountValue": null,
    "isPublished": true,
    "isLimited": true,
    "description": "* সরাসরি চায়না থেকে ইমপোর্ট করা শতভাগ প্রিমিয়াম কোয়ালিটির অথেনটিক প্লেয়ার ভার্সন জার্সি।\n* অত্যন্ত হালকা, স্ট্রেচেবল এবং বাতাস চলাচলের উপযোগী ফেব্রিক দিয়ে তৈরি।\n* ক্লাব লোগো, ব্র্যান্ড লোগো এবং স্পনসর প্রিন্ট নিখুঁত ও টেকসই হিট-প্রেসড প্রযুক্তিতে বসানো।\n* প্লেয়ারদের জার্সির মতো বডি-হাগিং অ্যাথলেটিক স্লিম ফিট ও নিখুঁত সেলাইয়ের ফিনিশিং।\n* নিয়মিত খেলাধুলা কিংবা ক্যাজুয়াল আউটফিট হিসেবে পরার জন্য অত্যন্ত আরামদায়ক ও আকর্ষণীয়।",
    "preorderDesc": "",
    "images": [
      {
        "url": "img/products/prod_mwdzcjyygi3k7sd87.jpg",
        "alt": "Al Nasser Away Kit",
        "isPrimary": true
      }
    ],
    "customBadge": "",
    "collectionId": null,
    "sku": "ZNV-MWDZDP6O",
    "customPrintPrice": null,
    "sizeChartType": "Player Edition",
    "categoryName": "Player Version",
    "discountEnd": null,
    "expectedArrival": null,
    "subcategoryId": "mw88n5w90qabal7hw",
    "sizeStocks": {},
    "imageUrl": "img/products/prod_mwdzcjyygi3k7sd87.jpg"
  },
  {
    "sku": "ZNV-MWDZARKV",
    "preorderCloseDate": null,
    "customName": false,
    "preorderSold": 0,
    "expectedArrival": null,
    "discountEnd": null,
    "gender": "Unisex",
    "isPublished": true,
    "description": "* সরাসরি চায়না থেকে ইমপোর্ট করা শতভাগ প্রিমিয়াম কোয়ালিটির অথেনটিক প্লেয়ার ভার্সন জার্সি।\n* অত্যন্ত হালকা, স্ট্রেচেবল এবং বাতাস চলাচলের উপযোগী ফেব্রিক দিয়ে তৈরি।\n* ক্লাব লোগো, ব্র্যান্ড লোগো এবং স্পনসর প্রিন্ট নিখুঁত ও টেকসই হিট-প্রেসড প্রযুক্তিতে বসানো।\n* প্লেয়ারদের জার্সির মতো বডি-হাগিং অ্যাথলেটিক স্লিম ফিট ও নিখুঁত সেলাইয়ের ফিনিশিং।\n* নিয়মিত খেলাধুলা কিংবা ক্যাজুয়াল আউটফিট হিসেবে পরার জন্য অত্যন্ত আরামদায়ক ও আকর্ষণীয়।",
    "discountType": "percent",
    "customLogo": false,
    "isDeliveryChargeMandatory": false,
    "customBadge": "",
    "shortDesc": "চায়না থেকে Imported অথেনটিক Player Version জার্সি",
    "customNumber": false,
    "deliveryNote": "",
    "team": "Al Nasser",
    "status": "published",
    "salePrice": 999,
    "stock": 10,
    "collectionId": null,
    "categoryName": "Player Version",
    "name": "Al Nasser Home Kit",
    "images": [
      {
        "url": "img/products/prod_mwdz5xxlf44t9pakf.jpg",
        "alt": "Al Nasser Hom Kit",
        "isPrimary": true
      }
    ],
    "isArchived": false,
    "sizeMapping": {
      "XL": {
        "width": 42,
        "height": 29
      },
      "XXL": {
        "width": 44,
        "height": 30
      },
      "XS": {
        "height": 31,
        "width": 46
      },
      "3XL": {
        "width": 46,
        "height": 31
      },
      "M": {
        "width": 38,
        "height": 27
      },
      "S": {
        "height": 26,
        "width": 36
      },
      "L": {
        "width": 40,
        "height": 28
      },
      "4XL": {
        "height": 31,
        "width": 46
      }
    },
    "seoDesc": "",
    "isBestSeller": false,
    "updatedAt": "2026-11-12T20:08:56.082Z",
    "isFeatured": false,
    "discountStart": null,
    "advancePaymentMode": "cod_only",
    "preorderDesc": "",
    "customText": false,
    "createdAt": "2026-11-12T20:02:48.969Z",
    "customPrintPrice": null,
    "assignedSizes": [
      "sz_s",
      "sz_m",
      "sz_l",
      "sz_xl",
      "sz_xxl",
      "sz_3xl",
      "sz_4xl"
    ],
    "slug": "al-nasser-home-kit",
    "deliveryChargeInsideDhaka": 80,
    "tax": 0,
    "deliveryChargeOutsideDhaka": 130,
    "assignedSleeves": [
      "slv_half"
    ],
    "lowStockAlert": 5,
    "basePrice": 1150,
    "categoryId": "cat_mens_football",
    "hasCustomDelivery": false,
    "customNameNumber": true,
    "isPreorder": false,
    "preorderStatus": "OPEN",
    "preorderPrice": null,
    "isLimited": true,
    "isNewArrival": false,
    "seoTitle": "",
    "image": "img/products/prod_mwdz5xxlf44t9pakf.jpg",
    "sizeChartImage": "",
    "assignedPatches": [],
    "expectedDelivery": null,
    "sizeStocks": {},
    "sizeChartType": "Player Edition",
    "subcategoryId": "mw88n5w90qabal7hw",
    "imageUrl": "img/products/prod_mwdz5xxlf44t9pakf.jpg",
    "compareAt": 1150,
    "sport": "Football",
    "discountValue": null,
    "costPrice": 750,
    "preorderCapacity": 100,
    "id": "prod_mwdz5xxlf44t9pakf"
  },
  {
    "expectedArrival": null,
    "updatedAt": "2026-11-12T18:36:33.575Z",
    "lowStockAlert": 5,
    "isBestSeller": false,
    "preorderPrice": null,
    "createdAt": "2026-11-12T18:35:44.492Z",
    "isArchived": false,
    "customPrintPrice": null,
    "stock": 10,
    "preorderDesc": "",
    "collectionId": null,
    "categoryName": "Player Version",
    "assignedSizes": [
      "sz_s",
      "sz_m",
      "sz_l",
      "sz_xl",
      "sz_xxl",
      "sz_3xl",
      "sz_4xl"
    ],
    "salePrice": 999,
    "isDeliveryChargeMandatory": false,
    "slug": "barcelona-goalkepper-kit",
    "isFeatured": false,
    "customText": false,
    "customNameNumber": true,
    "shortDesc": "চায়না থেকে Imported অথেনটিক Player Version জার্সি",
    "discountType": "percent",
    "customName": false,
    "customNumber": false,
    "expectedDelivery": null,
    "discountValue": null,
    "deliveryNote": "",
    "preorderStatus": "OPEN",
    "customLogo": false,
    "sizeChartType": "Player Edition",
    "sizeChartImage": "",
    "preorderCapacity": 100,
    "preorderSold": 0,
    "subcategoryId": null,
    "hasCustomDelivery": false,
    "sku": "ZNV-MWDW30JI",
    "assignedSleeves": [
      "slv_half"
    ],
    "team": "Barcelona",
    "seoTitle": "",
    "sizeStocks": {},
    "deliveryChargeInsideDhaka": 80,
    "images": [
      {
        "url": "img/products/prod_mwdw1yp7zoy2fqrwv.jpg",
        "alt": "Barcelona Goalkepper Kit",
        "isPrimary": true
      }
    ],
    "costPrice": null,
    "status": "published",
    "assignedPatches": [
      "patch_ucl"
    ],
    "sizeMapping": {
      "XS": {
        "width": 46,
        "height": 31
      },
      "M": {
        "width": 38,
        "height": 27
      },
      "XL": {
        "width": 42,
        "height": 29
      },
      "4XL": {
        "height": 31,
        "width": 46
      },
      "XXL": {
        "width": 44,
        "height": 30
      },
      "3XL": {
        "width": 46,
        "height": 31
      },
      "S": {
        "width": 36,
        "height": 26
      },
      "L": {
        "height": 28,
        "width": 40
      }
    },
    "compareAt": 1150,
    "sport": "Football",
    "preorderCloseDate": null,
    "basePrice": 1150,
    "discountEnd": null,
    "discountStart": null,
    "isNewArrival": false,
    "isLimited": true,
    "imageUrl": "img/products/prod_mwdw1yp7zoy2fqrwv.jpg",
    "image": "img/products/prod_mwdw1yp7zoy2fqrwv.jpg",
    "categoryId": "cat_mens_football",
    "customBadge": "",
    "deliveryChargeOutsideDhaka": 130,
    "description": "* সরাসরি চায়না থেকে ইমপোর্ট করা শতভাগ প্রিমিয়াম কোয়ালিটির অথেনটিক প্লেয়ার ভার্সন জার্সি।\n* অত্যন্ত হালকা, স্ট্রেচেবল এবং বাতাস চলাচলের উপযোগী ফেব্রিক দিয়ে তৈরি।\n* ক্লাব লোগো, ব্র্যান্ড লোগো এবং স্পনসর প্রিন্ট নিখুঁত ও টেকসই হিট-প্রেসড প্রযুক্তিতে বসানো।\n* প্লেয়ারদের জার্সির মতো বডি-হাগিং অ্যাথলেটিক স্লিম ফিট ও নিখুঁত সেলাইয়ের ফিনিশিং।\n* নিয়মিত খেলাধুলা কিংবা ক্যাজুয়াল আউটফিট হিসেবে পরার জন্য অত্যন্ত আরামদায়ক ও আকর্ষণীয়।",
    "isPublished": true,
    "id": "prod_mwdw1yp7zoy2fqrwv",
    "tax": 0,
    "name": "Barcelona Goalkepper Kit",
    "advancePaymentMode": "default",
    "isPreorder": false,
    "seoDesc": "",
    "gender": "Unisex"
  },
  {
    "isNewArrival": false,
    "customName": false,
    "subcategoryId": "mw88n5w90qabal7hw",
    "sizeChartType": "Player Edition",
    "shortDesc": "চায়না থেকে Imported অথেনটিক Player Version জার্সি",
    "name": "Paris Saint-Germain Away Kit (PSG)",
    "isDeliveryChargeMandatory": false,
    "tax": 0,
    "discountValue": null,
    "seoTitle": "",
    "status": "published",
    "customLogo": false,
    "expectedArrival": null,
    "hasCustomDelivery": false,
    "preorderStatus": "OPEN",
    "sport": "Football",
    "sizeChartImage": "",
    "images": [
      {
        "url": "img/products/prod_mwdw0pr4e23smtkbk.jpg",
        "alt": "Paris Saint-Germain Away Kit (PSG)",
        "isPrimary": true
      }
    ],
    "createdAt": "2026-11-12T18:34:46.240Z",
    "isArchived": false,
    "gender": "Unisex",
    "imageUrl": "img/products/prod_mwdw0pr4e23smtkbk.jpg",
    "updatedAt": "2026-11-12T18:35:14.701Z",
    "assignedSizes": [
      "sz_s",
      "sz_m",
      "sz_l",
      "sz_xl",
      "sz_xxl",
      "sz_3xl",
      "sz_4xl"
    ],
    "team": "PSG",
    "image": "img/products/prod_mwdw0pr4e23smtkbk.jpg",
    "customText": false,
    "isFeatured": false,
    "preorderPrice": null,
    "salePrice": 999,
    "lowStockAlert": 5,
    "preorderCloseDate": null,
    "customNumber": false,
    "isLimited": true,
    "deliveryNote": "",
    "discountEnd": null,
    "assignedPatches": [
      "patch_ucl"
    ],
    "customPrintPrice": null,
    "id": "prod_mwdw0pr4e23smtkbk",
    "stock": 10,
    "basePrice": 1150,
    "discountType": "percent",
    "preorderSold": 0,
    "seoDesc": "",
    "customBadge": "",
    "description": "* সরাসরি চায়না থেকে ইমপোর্ট করা শতভাগ প্রিমিয়াম কোয়ালিটির অথেনটিক প্লেয়ার ভার্সন জার্সি।\n* অত্যন্ত হালকা, স্ট্রেচেবল এবং বাতাস চলাচলের উপযোগী ফেব্রিক দিয়ে তৈরি।\n* ক্লাব লোগো, ব্র্যান্ড লোগো এবং স্পনসর প্রিন্ট নিখুঁত ও টেকসই হিট-প্রেসড প্রযুক্তিতে বসানো।\n* প্লেয়ারদের জার্সির মতো বডি-হাগিং অ্যাথলেটিক স্লিম ফিট ও নিখুঁত সেলাইয়ের ফিনিশিং।\n* নিয়মিত খেলাধুলা কিংবা ক্যাজুয়াল আউটফিট হিসেবে পরার জন্য অত্যন্ত আরামদায়ক ও আকর্ষণীয়।",
    "isPublished": true,
    "discountStart": null,
    "isPreorder": false,
    "assignedSleeves": [
      "slv_half"
    ],
    "categoryId": "cat_mens_football",
    "sku": "ZNV-MWDW1BON",
    "customNameNumber": true,
    "deliveryChargeInsideDhaka": 80,
    "preorderDesc": "",
    "advancePaymentMode": "cod_only",
    "costPrice": 750,
    "isBestSeller": false,
    "expectedDelivery": null,
    "slug": "paris-saint-germain-away-kit-psg",
    "sizeStocks": null,
    "compareAt": 1150,
    "sizeMapping": {
      "S": {
        "height": 26,
        "width": 36
      },
      "L": {
        "height": 28,
        "width": 40
      },
      "3XL": {
        "width": 46,
        "height": 31
      },
      "XXL": {
        "height": 30,
        "width": 44
      },
      "4XL": {
        "width": 46,
        "height": 31
      },
      "XL": {
        "width": 42,
        "height": 29
      },
      "M": {
        "height": 27,
        "width": 38
      },
      "XS": {
        "width": 46,
        "height": 31
      }
    },
    "preorderCapacity": 100,
    "collectionId": null,
    "categoryName": "Player Version",
    "deliveryChargeOutsideDhaka": 130
  },
  {
    "isFeatured": false,
    "advancePaymentMode": "cod_only",
    "isPublished": true,
    "description": "* সরাসরি চায়না থেকে ইমপোর্ট করা শতভাগ প্রিমিয়াম কোয়ালিটির অথেনটিক প্লেয়ার ভার্সন জার্সি।\n* অত্যন্ত হালকা, স্ট্রেচেবল এবং বাতাস চলাচলের উপযোগী ফেব্রিক দিয়ে তৈরি।\n* ক্লাব লোগো, ব্র্যান্ড লোগো এবং স্পনসর প্রিন্ট নিখুঁত ও টেকসই হিট-প্রেসড প্রযুক্তিতে বসানো।\n* প্লেয়ারদের জার্সির মতো বডি-হাগিং অ্যাথলেটিক স্লিম ফিট ও নিখুঁত সেলাইয়ের ফিনিশিং।\n* নিয়মিত খেলাধুলা কিংবা ক্যাজুয়াল আউটফিট হিসেবে পরার জন্য অত্যন্ত আরামদায়ক ও আকর্ষণীয়।",
    "customText": false,
    "customBadge": "",
    "preorderCloseDate": null,
    "expectedDelivery": null,
    "isArchived": false,
    "shortDesc": "চায়না থেকে Imported অথেনটিক Player Version জার্সি",
    "preorderCapacity": 100,
    "imageUrl": "img/products/prod_mwdvx1hidnhyrm6o0.jpg",
    "name": "Paris Saint-Germain Home Kit (PSG)",
    "discountEnd": null,
    "isNewArrival": false,
    "team": "PSG",
    "sizeMapping": {
      "4XL": {
        "width": 46,
        "height": 31
      },
      "M": {
        "width": 38,
        "height": 27
      },
      "XL": {
        "width": 42,
        "height": 29
      },
      "3XL": {
        "width": 46,
        "height": 31
      },
      "S": {
        "height": 26,
        "width": 36
      },
      "L": {
        "width": 40,
        "height": 28
      },
      "XS": {
        "width": 46,
        "height": 31
      },
      "XXL": {
        "width": 44,
        "height": 30
      }
    },
    "salePrice": 999,
    "deliveryChargeOutsideDhaka": 130,
    "seoTitle": "",
    "customPrintPrice": null,
    "expectedArrival": null,
    "seoDesc": "",
    "discountStart": null,
    "customLogo": false,
    "tax": 0,
    "customName": false,
    "updatedAt": "2026-11-12T18:33:53.652Z",
    "isDeliveryChargeMandatory": false,
    "stock": 10,
    "createdAt": "2026-11-12T18:31:54.822Z",
    "customNameNumber": true,
    "image": "img/products/prod_mwdvx1hidnhyrm6o0.jpg",
    "lowStockAlert": 5,
    "preorderPrice": null,
    "preorderSold": 0,
    "assignedSizes": [
      "sz_s",
      "sz_m",
      "sz_l",
      "sz_xl",
      "sz_xxl",
      "sz_3xl",
      "sz_4xl"
    ],
    "basePrice": 1150,
    "discountType": "percent",
    "hasCustomDelivery": false,
    "isLimited": true,
    "deliveryNote": "",
    "sizeStocks": null,
    "customNumber": false,
    "gender": "Unisex",
    "sizeChartImage": "",
    "categoryName": "Player Version",
    "isPreorder": false,
    "preorderStatus": "OPEN",
    "images": [
      {
        "url": "img/products/prod_mwdvx1hidnhyrm6o0.jpg",
        "alt": "Paris Saint-Germain Home Kit (PSG)",
        "isPrimary": true
      }
    ],
    "collectionId": null,
    "assignedSleeves": [
      "slv_half"
    ],
    "categoryId": "cat_mens_football",
    "deliveryChargeInsideDhaka": 80,
    "compareAt": 1150,
    "sport": "Football",
    "discountValue": null,
    "status": "published",
    "sizeChartType": "Player Edition",
    "isBestSeller": false,
    "assignedPatches": [
      "patch_ucl"
    ],
    "costPrice": 750,
    "preorderDesc": "",
    "slug": "paris-saint-germain-home-kit-psg",
    "subcategoryId": "mw88n5w90qabal7hw",
    "id": "prod_mwdvx1hidnhyrm6o0",
    "sku": "ZNV-MWDVZL59"
  },
  {
    "hasCustomDelivery": false,
    "categoryName": "Player Version",
    "name": "Ac Milan Away Kit",
    "collectionId": null,
    "preorderDesc": "",
    "categoryId": "cat_mens_football",
    "advancePaymentMode": "cod_only",
    "shortDesc": "চায়না থেকে Imported অথেনটিক Player Version জার্সি",
    "isPreorder": false,
    "isBestSeller": false,
    "sizeMapping": {
      "L": {
        "height": 28,
        "width": 40
      },
      "3XL": {
        "width": 46,
        "height": 31
      },
      "S": {
        "width": 36,
        "height": 26
      },
      "XXL": {
        "width": 44,
        "height": 30
      },
      "4XL": {
        "height": 31,
        "width": 46
      },
      "M": {
        "height": 27,
        "width": 38
      },
      "XL": {
        "height": 29,
        "width": 42
      },
      "XS": {
        "width": 46,
        "height": 31
      }
    },
    "sku": "ZNV-MWDTPSYX",
    "discountEnd": null,
    "discountStart": null,
    "salePrice": 999,
    "sizeStocks": null,
    "preorderSold": 0,
    "sizeChartImage": "",
    "preorderStatus": "OPEN",
    "deliveryChargeOutsideDhaka": 130,
    "deliveryNote": "",
    "deliveryChargeInsideDhaka": 80,
    "updatedAt": "2026-11-13T06:01:03.570Z",
    "expectedArrival": null,
    "customNumber": false,
    "stock": 10,
    "team": "Ac Milan",
    "customBadge": "",
    "discountType": "percent",
    "createdAt": "2026-11-12T17:29:32.172Z",
    "isPublished": true,
    "description": "* সরাসরি চায়না থেকে ইমপোর্ট করা শতভাগ প্রিমিয়াম কোয়ালিটির অথেনটিক প্লেয়ার ভার্সন জার্সি।\n* অত্যন্ত হালকা, স্ট্রেচেবল এবং বাতাস চলাচলের উপযোগী ফেব্রিক দিয়ে তৈরি।\n* ক্লাব লোগো, ব্র্যান্ড লোগো এবং স্পনসর প্রিন্ট নিখুঁত ও টেকসই হিট-প্রেসড প্রযুক্তিতে বসানো।\n* প্লেয়ারদের জার্সির মতো বডি-হাগিং অ্যাথলেটিক স্লিম ফিট ও নিখুঁত সেলাইয়ের ফিনিশিং।\n* নিয়মিত খেলাধুলা কিংবা ক্যাজুয়াল আউটফিট হিসেবে পরার জন্য অত্যন্ত আরামদায়ক ও আকর্ষণীয়।",
    "preorderPrice": null,
    "id": "prod_mwdtotn087sehyqui",
    "expectedDelivery": null,
    "seoDesc": "",
    "image": "img/products/prod_mwdtotn087sehyqui.jpg",
    "customName": false,
    "lowStockAlert": 5,
    "basePrice": 1150,
    "status": "published",
    "customLogo": false,
    "seoTitle": "",
    "isLimited": true,
    "preorderCapacity": 100,
    "preorderCloseDate": null,
    "images": [
      {
        "url": "img/products/prod_mwdtotn087sehyqui.jpg",
        "alt": "Ac Milan Away Kit",
        "isPrimary": true
      }
    ],
    "assignedSizes": [
      "sz_s",
      "sz_m",
      "sz_l",
      "sz_xl",
      "sz_xxl",
      "sz_3xl",
      "sz_4xl"
    ],
    "gender": "Unisex",
    "isDeliveryChargeMandatory": false,
    "discountValue": null,
    "customPrintPrice": null,
    "assignedPatches": [
      "patch_ucl"
    ],
    "sport": "Football",
    "imageUrl": "img/products/prod_mwdtotn087sehyqui.jpg",
    "isArchived": false,
    "compareAt": 1150,
    "slug": "ac-milan-away-kit",
    "tax": 0,
    "customNameNumber": true,
    "subcategoryId": "mw88n5w90qabal7hw",
    "isNewArrival": false,
    "assignedSleeves": [
      "slv_half"
    ],
    "costPrice": 750,
    "isFeatured": false,
    "customText": false,
    "sizeChartType": "Player Edition"
  },
  {
    "assignedSizes": [
      "sz_s",
      "sz_m",
      "sz_l",
      "sz_xl",
      "sz_xxl",
      "sz_3xl",
      "sz_4xl"
    ],
    "isArchived": false,
    "assignedPatches": [
      "patch_ucl"
    ],
    "preorderSold": 0,
    "sport": "Football",
    "status": "published",
    "isPreorder": false,
    "isNewArrival": false,
    "costPrice": 750,
    "categoryId": "cat_mens_football",
    "isLimited": true,
    "discountType": "percent",
    "discountStart": null,
    "image": "img/products/prod_mwdtnvopswdqcm154.jpg",
    "isDeliveryChargeMandatory": false,
    "customBadge": "",
    "name": "Ac Milan Home Kit",
    "createdAt": "2026-11-12T17:28:48.170Z",
    "tax": 0,
    "categoryName": "Player Version",
    "collectionId": null,
    "hasCustomDelivery": false,
    "sizeStocks": null,
    "deliveryChargeInsideDhaka": 80,
    "lowStockAlert": 5,
    "isBestSeller": false,
    "seoDesc": "",
    "customPrintPrice": null,
    "subcategoryId": "mw88n5w90qabal7hw",
    "preorderStatus": "OPEN",
    "sizeMapping": {
      "M": {
        "width": 38,
        "height": 27
      },
      "L": {
        "height": 28,
        "width": 40
      },
      "XXL": {
        "width": 44,
        "height": 30
      },
      "4XL": {
        "width": 46,
        "height": 31
      },
      "XL": {
        "height": 29,
        "width": 42
      },
      "S": {
        "height": 26,
        "width": 36
      },
      "XS": {
        "width": 46,
        "height": 31
      },
      "3XL": {
        "width": 46,
        "height": 31
      }
    },
    "updatedAt": "2026-11-13T06:04:50.621Z",
    "deliveryChargeOutsideDhaka": 130,
    "isPublished": true,
    "customNumber": false,
    "salePrice": 999,
    "basePrice": 1150,
    "description": "* সরাসরি চায়না থেকে ইমপোর্ট করা শতভাগ প্রিমিয়াম কোয়ালিটির অথেনটিক প্লেয়ার ভার্সন জার্সি।\n* অত্যন্ত হালকা, স্ট্রেচেবল এবং বাতাস চলাচলের উপযোগী ফেব্রিক দিয়ে তৈরি।\n* ক্লাব লোগো, ব্র্যান্ড লোগো এবং স্পনসর প্রিন্ট নিখুঁত ও টেকসই হিট-প্রেসড প্রযুক্তিতে বসানো।\n* প্লেয়ারদের জার্সির মতো বডি-হাগিং অ্যাথলেটিক স্লিম ফিট ও নিখুঁত সেলাইয়ের ফিনিশিং।\n* নিয়মিত খেলাধুলা কিংবা ক্যাজুয়াল আউটফিট হিসেবে পরার জন্য অত্যন্ত আরামদায়ক ও আকর্ষণীয়।",
    "seoTitle": "",
    "preorderPrice": null,
    "preorderDesc": "",
    "customText": false,
    "slug": "ac-milan-home-kit",
    "preorderCloseDate": null,
    "imageUrl": "img/products/prod_mwdtnvopswdqcm154.jpg",
    "sizeChartType": "Player Edition",
    "expectedDelivery": null,
    "sizeChartImage": "",
    "customLogo": false,
    "advancePaymentMode": "cod_only",
    "deliveryNote": "",
    "customName": false,
    "assignedSleeves": [
      "slv_half"
    ],
    "discountEnd": null,
    "preorderCapacity": 100,
    "isFeatured": false,
    "discountValue": null,
    "sku": "ZNV-MWDTOPRF",
    "expectedArrival": null,
    "id": "prod_mwdtnvopswdqcm154",
    "customNameNumber": true,
    "stock": 10,
    "team": "Ac Milan",
    "images": [
      {
        "alt": "Ac Milan Home Kit",
        "url": "img/products/prod_mwdtnvopswdqcm154.jpg",
        "isPrimary": true
      }
    ],
    "shortDesc": "চায়না থেকে Imported অথেনটিক Player Version জার্সি",
    "gender": "Unisex",
    "compareAt": 1150
  },
  {
    "discountValue": null,
    "expectedDelivery": null,
    "preorderDesc": "",
    "isFeatured": false,
    "updatedAt": "2026-11-13T06:04:55.482Z",
    "discountEnd": null,
    "slug": "liverpool-third-kit",
    "preorderStatus": "OPEN",
    "basePrice": 1150,
    "salePrice": 999,
    "deliveryNote": "",
    "isDeliveryChargeMandatory": false,
    "advancePaymentMode": "cod_only",
    "assignedPatches": [
      "patch_ucl"
    ],
    "customText": false,
    "team": "Liverpool",
    "preorderCloseDate": null,
    "status": "published",
    "costPrice": 750,
    "deliveryChargeOutsideDhaka": 130,
    "deliveryChargeInsideDhaka": 80,
    "preorderPrice": null,
    "sport": "Football",
    "isLimited": true,
    "id": "prod_mwdtkv181mwc9koh8",
    "preorderCapacity": 100,
    "createdAt": "2026-11-12T17:26:27.357Z",
    "customName": false,
    "sizeChartType": "Player Edition",
    "customNameNumber": true,
    "image": "img/products/prod_mwdtkv181mwc9koh8.jpg",
    "description": "* সরাসরি চায়না থেকে ইমপোর্ট করা শতভাগ প্রিমিয়াম কোয়ালিটির অথেনটিক প্লেয়ার ভার্সন জার্সি।\n* অত্যন্ত হালকা, স্ট্রেচেবল এবং বাতাস চলাচলের উপযোগী ফেব্রিক দিয়ে তৈরি।\n* ক্লাব লোগো, ব্র্যান্ড লোগো এবং স্পনসর প্রিন্ট নিখুঁত ও টেকসই হিট-প্রেসড প্রযুক্তিতে বসানো।\n* প্লেয়ারদের জার্সির মতো বডি-হাগিং অ্যাথলেটিক স্লিম ফিট ও নিখুঁত সেলাইয়ের ফিনিশিং।\n* নিয়মিত খেলাধুলা কিংবা ক্যাজুয়াল আউটফিট হিসেবে পরার জন্য অত্যন্ত আরামদায়ক ও আকর্ষণীয়।",
    "tax": 0,
    "customLogo": false,
    "preorderSold": 0,
    "name": "Liverpool Third Kit",
    "isPublished": true,
    "lowStockAlert": 5,
    "stock": 10,
    "subcategoryId": "mw88n5w90qabal7hw",
    "expectedArrival": null,
    "discountType": "percent",
    "sku": "ZNV-MWDTLZU6",
    "isNewArrival": false,
    "seoDesc": "",
    "shortDesc": "চায়না থেকে Imported অথেনটিক Player Version জার্সি",
    "sizeMapping": {
      "XL": {
        "height": 29,
        "width": 42
      },
      "M": {
        "height": 27,
        "width": 38
      },
      "XS": {
        "width": 46,
        "height": 31
      },
      "3XL": {
        "height": 31,
        "width": 46
      },
      "L": {
        "width": 40,
        "height": 28
      },
      "XXL": {
        "width": 44,
        "height": 30
      },
      "S": {
        "height": 26,
        "width": 36
      },
      "4XL": {
        "width": 46,
        "height": 31
      }
    },
    "collectionId": null,
    "images": [
      {
        "alt": "Liverpool Third Kit",
        "isPrimary": true,
        "url": "img/products/prod_mwdtkv181mwc9koh8.jpg"
      }
    ],
    "gender": "Unisex",
    "compareAt": 1150,
    "categoryName": "Player Version",
    "assignedSizes": [
      "sz_s",
      "sz_m",
      "sz_l",
      "sz_xl",
      "sz_xxl",
      "sz_3xl",
      "sz_4xl"
    ],
    "categoryId": "cat_mens_football",
    "isBestSeller": false,
    "sizeChartImage": "",
    "isArchived": false,
    "customBadge": "",
    "discountStart": null,
    "isPreorder": false,
    "customPrintPrice": null,
    "sizeStocks": null,
    "seoTitle": "",
    "hasCustomDelivery": false,
    "imageUrl": "img/products/prod_mwdtkv181mwc9koh8.jpg",
    "customNumber": false,
    "assignedSleeves": [
      "slv_half"
    ]
  },
  {
    "deliveryChargeOutsideDhaka": 130,
    "customPrintPrice": null,
    "updatedAt": "2026-11-13T06:05:02.010Z",
    "isPublished": true,
    "preorderPrice": null,
    "basePrice": 1150,
    "salePrice": 999,
    "categoryName": "Player Version",
    "collectionId": null,
    "seoDesc": "",
    "sizeChartType": "Player Edition",
    "sizeMapping": {
      "XXL": {
        "width": 44,
        "height": 30
      },
      "4XL": {
        "width": 46,
        "height": 31
      },
      "M": {
        "width": 38,
        "height": 27
      },
      "3XL": {
        "width": 46,
        "height": 31
      },
      "XL": {
        "width": 42,
        "height": 29
      },
      "L": {
        "width": 40,
        "height": 28
      },
      "S": {
        "width": 36,
        "height": 26
      },
      "XS": {
        "width": 46,
        "height": 31
      }
    },
    "preorderSold": 0,
    "isNewArrival": false,
    "discountType": "percent",
    "preorderCloseDate": null,
    "createdAt": "2026-11-12T17:23:03.651Z",
    "isArchived": false,
    "imageUrl": "img/products/prod_mwdtghurjayd4us4t.jpg",
    "discountValue": null,
    "isPreorder": false,
    "id": "prod_mwdtghurjayd4us4t",
    "categoryId": "cat_mens_football",
    "seoTitle": "",
    "customBadge": "",
    "status": "published",
    "customNumber": false,
    "isBestSeller": false,
    "sizeChartImage": "",
    "assignedPatches": [
      "patch_ucl"
    ],
    "stock": 10,
    "name": "Liverpool Away Kit",
    "isLimited": true,
    "costPrice": 750,
    "sizeStocks": null,
    "advancePaymentMode": "cod_only",
    "sku": "ZNV-MWDTHAYH",
    "shortDesc": "চায়না থেকে Imported অথেনটিক Player Version জার্সি",
    "preorderCapacity": 100,
    "isFeatured": false,
    "assignedSizes": [
      "sz_s",
      "sz_m",
      "sz_l",
      "sz_xl",
      "sz_xxl",
      "sz_3xl",
      "sz_4xl"
    ],
    "image": "img/products/prod_mwdtghurjayd4us4t.jpg",
    "preorderStatus": "OPEN",
    "deliveryNote": "",
    "customNameNumber": true,
    "discountStart": null,
    "hasCustomDelivery": false,
    "compareAt": 1150,
    "tax": 0,
    "sport": "Football",
    "expectedArrival": null,
    "gender": "Unisex",
    "discountEnd": null,
    "team": "Liverpool",
    "preorderDesc": "",
    "images": [
      {
        "alt": "Liverpool Away Kit",
        "isPrimary": true,
        "url": "img/products/prod_mwdtghurjayd4us4t.jpg"
      }
    ],
    "slug": "liverpool-away-kit",
    "subcategoryId": "mw88n5w90qabal7hw",
    "lowStockAlert": 5,
    "customText": false,
    "assignedSleeves": [
      "slv_half"
    ],
    "customLogo": false,
    "expectedDelivery": null,
    "isDeliveryChargeMandatory": false,
    "deliveryChargeInsideDhaka": 80,
    "description": "* সরাসরি চায়না থেকে ইমপোর্ট করা শতভাগ প্রিমিয়াম কোয়ালিটির অথেনটিক প্লেয়ার ভার্সন জার্সি।\n* অত্যন্ত হালকা, স্ট্রেচেবল এবং বাতাস চলাচলের উপযোগী ফেব্রিক দিয়ে তৈরি।\n* ক্লাব লোগো, ব্র্যান্ড লোগো এবং স্পনসর প্রিন্ট নিখুঁত ও টেকসই হিট-প্রেসড প্রযুক্তিতে বসানো।\n* প্লেয়ারদের জার্সির মতো বডি-হাগিং অ্যাথলেটিক স্লিম ফিট ও নিখুঁত সেলাইয়ের ফিনিশিং।\n* নিয়মিত খেলাধুলা কিংবা ক্যাজুয়াল আউটফিট হিসেবে পরার জন্য অত্যন্ত আরামদায়ক ও আকর্ষণীয়।",
    "customName": false
  },
  {
    "isDeliveryChargeMandatory": false,
    "isFeatured": false,
    "description": "* সরাসরি চায়না থেকে ইমপোর্ট করা শতভাগ প্রিমিয়াম কোয়ালিটির অথেনটিক প্লেয়ার ভার্সন জার্সি।\n* অত্যন্ত হালকা, স্ট্রেচেবল এবং বাতাস চলাচলের উপযোগী ফেব্রিক দিয়ে তৈরি।\n* ক্লাব লোগো, ব্র্যান্ড লোগো এবং স্পনসর প্রিন্ট নিখুঁত ও টেকসই হিট-প্রেসড প্রযুক্তিতে বসানো।\n* প্লেয়ারদের জার্সির মতো বডি-হাগিং অ্যাথলেটিক স্লিম ফিট ও নিখুঁত সেলাইয়ের ফিনিশিং।\n* নিয়মিত খেলাধুলা কিংবা ক্যাজুয়াল আউটফিট হিসেবে পরার জন্য অত্যন্ত আরামদায়ক ও আকর্ষণীয়।",
    "updatedAt": "2026-11-13T06:05:07.190Z",
    "sizeChartType": "Player Edition",
    "basePrice": 1150,
    "salePrice": 999,
    "deliveryNote": "",
    "assignedPatches": [
      "patch_ucl"
    ],
    "deliveryChargeInsideDhaka": 80,
    "name": "Liverpool Home Kit",
    "preorderPrice": null,
    "id": "prod_mwdteu3bvlwp2g91l",
    "advancePaymentMode": "cod_only",
    "sku": "ZNV-MWDTGEX5",
    "preorderDesc": "",
    "hasCustomDelivery": false,
    "createdAt": "2026-11-12T17:21:46.199Z",
    "discountEnd": null,
    "imageUrl": "img/products/prod_mwdteu3bvlwp2g91l.jpg",
    "customPrintPrice": null,
    "seoTitle": "",
    "images": [
      {
        "isPrimary": true,
        "alt": "Liverpool Home Kit",
        "url": "img/products/prod_mwdteu3bvlwp2g91l.jpg"
      }
    ],
    "stock": 10,
    "gender": "Unisex",
    "customText": false,
    "customLogo": false,
    "discountValue": null,
    "isLimited": true,
    "preorderStatus": "OPEN",
    "customName": false,
    "costPrice": 750,
    "shortDesc": "চায়না থেকে Imported অথেনটিক Player Version জার্সি",
    "sizeChartImage": "",
    "sport": "Football",
    "slug": "liverpool-home-kit",
    "collectionId": null,
    "compareAt": 1150,
    "preorderCloseDate": null,
    "categoryName": "Player Version",
    "expectedDelivery": null,
    "discountStart": null,
    "image": "img/products/prod_mwdteu3bvlwp2g91l.jpg",
    "preorderSold": 0,
    "assignedSleeves": [
      "slv_half"
    ],
    "customBadge": "",
    "discountType": "percent",
    "assignedSizes": [
      "sz_s",
      "sz_m",
      "sz_l",
      "sz_xl",
      "sz_xxl",
      "sz_3xl",
      "sz_4xl"
    ],
    "status": "published",
    "isNewArrival": false,
    "isArchived": false,
    "expectedArrival": null,
    "isPreorder": false,
    "preorderCapacity": 100,
    "categoryId": "cat_mens_football",
    "tax": 0,
    "customNumber": false,
    "sizeMapping": {
      "XXL": {
        "width": 44,
        "height": 30
      },
      "4XL": {
        "width": 46,
        "height": 31
      },
      "L": {
        "height": 28,
        "width": 40
      },
      "3XL": {
        "height": 31,
        "width": 46
      },
      "S": {
        "height": 26,
        "width": 36
      },
      "XS": {
        "width": 46,
        "height": 31
      },
      "XL": {
        "height": 29,
        "width": 42
      },
      "M": {
        "width": 38,
        "height": 27
      }
    },
    "customNameNumber": true,
    "seoDesc": "",
    "isBestSeller": false,
    "team": "Liverpool",
    "subcategoryId": "mw88n5w90qabal7hw",
    "deliveryChargeOutsideDhaka": 130,
    "lowStockAlert": 5,
    "sizeStocks": null,
    "isPublished": true
  },
  {
    "isPublished": true,
    "assignedSizes": [
      "sz_s",
      "sz_m",
      "sz_l",
      "sz_xl",
      "sz_xxl",
      "sz_3xl",
      "sz_4xl"
    ],
    "collectionId": null,
    "sizeStocks": null,
    "categoryName": "Player Version",
    "name": "Bayern Munich Third Kit",
    "discountStart": null,
    "discountType": "percent",
    "categoryId": "cat_mens_football",
    "sizeMapping": {
      "S": {
        "height": 26,
        "width": 36
      },
      "XXL": {
        "height": 30,
        "width": 44
      },
      "4XL": {
        "width": 46,
        "height": 31
      },
      "L": {
        "height": 28,
        "width": 40
      },
      "3XL": {
        "width": 46,
        "height": 31
      },
      "XS": {
        "height": 31,
        "width": 46
      },
      "M": {
        "width": 38,
        "height": 27
      },
      "XL": {
        "height": 29,
        "width": 42
      }
    },
    "isNewArrival": false,
    "deliveryChargeOutsideDhaka": 130,
    "preorderSold": 0,
    "isArchived": false,
    "id": "prod_mwdtbvzvlj9kypg6d",
    "status": "published",
    "isPreorder": false,
    "assignedSleeves": [
      "slv_half"
    ],
    "sizeChartImage": "",
    "lowStockAlert": 5,
    "customNumber": false,
    "subcategoryId": "mw88n5w90qabal7hw",
    "image": "img/products/prod_mwdtbvzvlj9kypg6d.jpg",
    "expectedArrival": null,
    "customBadge": "",
    "tax": 0,
    "customPrintPrice": null,
    "sport": "Football",
    "shortDesc": "চায়না থেকে Imported অথেনটিক Player Version জার্সি",
    "compareAt": 1150,
    "isBestSeller": false,
    "preorderCloseDate": null,
    "seoTitle": "",
    "customName": false,
    "assignedPatches": [
      "patch_ucl"
    ],
    "deliveryNote": "",
    "costPrice": 750,
    "preorderPrice": null,
    "isLimited": true,
    "imageUrl": "img/products/prod_mwdtbvzvlj9kypg6d.jpg",
    "customLogo": false,
    "slug": "bayern-munich-third-kit",
    "preorderDesc": "",
    "sizeChartType": "Player Edition",
    "deliveryChargeInsideDhaka": 80,
    "advancePaymentMode": "cod_only",
    "customText": false,
    "createdAt": "2026-11-12T17:19:28.699Z",
    "seoDesc": "",
    "stock": 10,
    "expectedDelivery": null,
    "isDeliveryChargeMandatory": false,
    "discountEnd": null,
    "preorderStatus": "OPEN",
    "sku": "ZNV-MWDTEFH7",
    "discountValue": null,
    "customNameNumber": true,
    "gender": "Unisex",
    "team": "Bayern Munich",
    "hasCustomDelivery": false,
    "preorderCapacity": 100,
    "images": [
      {
        "alt": "Bayern Munich Third Kit",
        "isPrimary": true,
        "url": "img/products/prod_mwdtbvzvlj9kypg6d.jpg"
      }
    ],
    "updatedAt": "2026-11-13T06:05:15.320Z",
    "description": "* সরাসরি চায়না থেকে ইমপোর্ট করা শতভাগ প্রিমিয়াম কোয়ালিটির অথেনটিক প্লেয়ার ভার্সন জার্সি।\n* অত্যন্ত হালকা, স্ট্রেচেবল এবং বাতাস চলাচলের উপযোগী ফেব্রিক দিয়ে তৈরি।\n* ক্লাব লোগো, ব্র্যান্ড লোগো এবং স্পনসর প্রিন্ট নিখুঁত ও টেকসই হিট-প্রেসড প্রযুক্তিতে বসানো।\n* প্লেয়ারদের জার্সির মতো বডি-হাগিং অ্যাথলেটিক স্লিম ফিট ও নিখুঁত সেলাইয়ের ফিনিশিং।\n* নিয়মিত খেলাধুলা কিংবা ক্যাজুয়াল আউটফিট হিসেবে পরার জন্য অত্যন্ত আরামদায়ক ও আকর্ষণীয়।",
    "isFeatured": false,
    "basePrice": 1150,
    "salePrice": 999
  },
  {
    "isPublished": true,
    "image": "img/products/prod_mwdt7mr7numexc9dh.jpg",
    "sizeChartType": "Player Edition",
    "seoTitle": "",
    "images": [
      {
        "alt": "Bayern Munich Away Kit",
        "url": "img/products/prod_mwdt7mr7numexc9dh.jpg",
        "isPrimary": true
      }
    ],
    "gender": "Unisex",
    "deliveryNote": "",
    "assignedPatches": [
      "patch_ucl"
    ],
    "imageUrl": "img/products/prod_mwdt7mr7numexc9dh.jpg",
    "deliveryChargeOutsideDhaka": 130,
    "preorderDesc": "",
    "shortDesc": "চায়না থেকে Imported অথেনটিক Player Version জার্সি",
    "isFeatured": false,
    "sizeMapping": {
      "M": {
        "width": 38,
        "height": 27
      },
      "S": {
        "height": 26,
        "width": 36
      },
      "XXL": {
        "width": 44,
        "height": 30
      },
      "4XL": {
        "width": 46,
        "height": 31
      },
      "L": {
        "height": 28,
        "width": 40
      },
      "XL": {
        "width": 42,
        "height": 29
      },
      "XS": {
        "width": 46,
        "height": 31
      },
      "3XL": {
        "width": 46,
        "height": 31
      }
    },
    "sport": "Football",
    "compareAt": 1150,
    "slug": "bayern-munich-away-kit",
    "preorderPrice": null,
    "seoDesc": "",
    "customPrintPrice": null,
    "team": "Bayern Munich",
    "customLogo": false,
    "customBadge": "",
    "customName": false,
    "advancePaymentMode": "cod_only",
    "discountValue": null,
    "sizeChartImage": "",
    "id": "prod_mwdt7mr7numexc9dh",
    "tax": 0,
    "preorderCloseDate": null,
    "customText": false,
    "collectionId": null,
    "name": "Bayern Munich Away Kit",
    "deliveryChargeInsideDhaka": 80,
    "categoryName": "Player Version",
    "sku": "ZNV-MWDT8COX",
    "preorderStatus": "OPEN",
    "isDeliveryChargeMandatory": false,
    "updatedAt": "2026-11-13T06:05:21.811Z",
    "expectedDelivery": null,
    "discountType": "percent",
    "isNewArrival": false,
    "assignedSleeves": [
      "slv_half"
    ],
    "assignedSizes": [
      "sz_s",
      "sz_m",
      "sz_l",
      "sz_xl",
      "sz_xxl",
      "sz_3xl",
      "sz_4xl"
    ],
    "discountStart": null,
    "preorderSold": 0,
    "discountEnd": null,
    "salePrice": 999,
    "basePrice": 1150,
    "customNumber": false,
    "expectedArrival": null,
    "preorderCapacity": 100,
    "hasCustomDelivery": false,
    "costPrice": 750,
    "customNameNumber": true,
    "isLimited": true,
    "sizeStocks": null,
    "subcategoryId": "mw88n5w90qabal7hw",
    "isArchived": false,
    "status": "published",
    "isPreorder": false,
    "createdAt": "2026-11-12T17:16:10.100Z",
    "lowStockAlert": 5,
    "description": "* সরাসরি চায়না থেকে ইমপোর্ট করা শতভাগ প্রিমিয়াম কোয়ালিটির অথেনটিক প্লেয়ার ভার্সন জার্সি।\n* অত্যন্ত হালকা, স্ট্রেচেবল এবং বাতাস চলাচলের উপযোগী ফেব্রিক দিয়ে তৈরি।\n* ক্লাব লোগো, ব্র্যান্ড লোগো এবং স্পনসর প্রিন্ট নিখুঁত ও টেকসই হিট-প্রেসড প্রযুক্তিতে বসানো।\n* প্লেয়ারদের জার্সির মতো বডি-হাগিং অ্যাথলেটিক স্লিম ফিট ও নিখুঁত সেলাইয়ের ফিনিশিং।\n* নিয়মিত খেলাধুলা কিংবা ক্যাজুয়াল আউটফিট হিসেবে পরার জন্য অত্যন্ত আরামদায়ক ও আকর্ষণীয়।",
    "categoryId": "cat_mens_football",
    "isBestSeller": false,
    "stock": 10
  },
  {
    "costPrice": 750,
    "gender": "Unisex",
    "tax": 0,
    "images": [
      {
        "url": "img/products/prod_mwdt4uwdo30gbqxdp.jpg",
        "alt": "Bayern Munich Home Kit",
        "isPrimary": true
      }
    ],
    "discountType": "percent",
    "slug": "bayern-munich-home-kit",
    "expectedDelivery": null,
    "isNewArrival": false,
    "discountStart": null,
    "isLimited": true,
    "customText": false,
    "customBadge": "",
    "preorderSold": 0,
    "assignedSizes": [
      "sz_s",
      "sz_m",
      "sz_l",
      "sz_xl",
      "sz_xxl",
      "sz_3xl",
      "sz_4xl"
    ],
    "image": "img/products/prod_mwdt4uwdo30gbqxdp.jpg",
    "collectionId": null,
    "customLogo": false,
    "categoryName": "Player Version",
    "preorderStatus": "OPEN",
    "seoDesc": "",
    "customName": false,
    "sport": "Football",
    "createdAt": "2026-11-12T17:14:00.685Z",
    "preorderCloseDate": null,
    "isPublished": true,
    "deliveryChargeOutsideDhaka": 130,
    "isFeatured": false,
    "seoTitle": "",
    "assignedPatches": [
      "patch_ucl"
    ],
    "lowStockAlert": 5,
    "imageUrl": "img/products/prod_mwdt4uwdo30gbqxdp.jpg",
    "isBestSeller": false,
    "subcategoryId": "mw88n5w90qabal7hw",
    "customNumber": false,
    "preorderCapacity": 100,
    "sizeMapping": {
      "M": {
        "width": 38,
        "height": 27
      },
      "4XL": {
        "height": 31,
        "width": 46
      },
      "XXL": {
        "height": 30,
        "width": 44
      },
      "3XL": {
        "width": 46,
        "height": 31
      },
      "L": {
        "width": 40,
        "height": 28
      },
      "S": {
        "width": 36,
        "height": 26
      },
      "XL": {
        "height": 29,
        "width": 42
      },
      "XS": {
        "width": 46,
        "height": 31
      }
    },
    "salePrice": 999,
    "basePrice": 1150,
    "updatedAt": "2026-11-13T06:05:28.415Z",
    "team": "Bayern Munich",
    "customNameNumber": true,
    "preorderDesc": "",
    "isPreorder": false,
    "preorderPrice": null,
    "id": "prod_mwdt4uwdo30gbqxdp",
    "isArchived": false,
    "expectedArrival": null,
    "hasCustomDelivery": false,
    "categoryId": "cat_mens_football",
    "deliveryNote": "",
    "deliveryChargeInsideDhaka": 80,
    "sizeStocks": null,
    "description": "* সরাসরি চায়না থেকে ইমপোর্ট করা শতভাগ প্রিমিয়াম কোয়ালিটির অথেনটিক প্লেয়ার ভার্সন জার্সি।\n* অত্যন্ত হালকা, স্ট্রেচেবল এবং বাতাস চলাচলের উপযোগী ফেব্রিক দিয়ে তৈরি।\n* ক্লাব লোগো, ব্র্যান্ড লোগো এবং স্পনসর প্রিন্ট নিখুঁত ও টেকসই হিট-প্রেসড প্রযুক্তিতে বসানো।\n* প্লেয়ারদের জার্সির মতো বডি-হাগিং অ্যাথলেটিক স্লিম ফিট ও নিখুঁত সেলাইয়ের ফিনিশিং।\n* নিয়মিত খেলাধুলা কিংবা ক্যাজুয়াল আউটফিট হিসেবে পরার জন্য অত্যন্ত আরামদায়ক ও আকর্ষণীয়।",
    "isDeliveryChargeMandatory": false,
    "name": "Bayern Munich Home Kit",
    "sizeChartType": "Player Edition",
    "sizeChartImage": "",
    "discountValue": null,
    "sku": "ZNV-MWDT5ZKW",
    "compareAt": 1150,
    "customPrintPrice": null,
    "stock": 10,
    "status": "published",
    "discountEnd": null,
    "advancePaymentMode": "cod_only",
    "assignedSleeves": [
      "slv_half"
    ],
    "shortDesc": "চায়না থেকে Imported অথেনটিক Player Version জার্সি"
  },
  {
    "images": [
      {
        "url": "img/products/prod_mwdt2ma80pcwaiut4.jpg",
        "alt": "Arsenal Third Kit",
        "isPrimary": true
      }
    ],
    "gender": "Unisex",
    "costPrice": 750,
    "isPreorder": false,
    "deliveryChargeOutsideDhaka": 130,
    "stock": 0,
    "isLimited": true,
    "isArchived": false,
    "expectedDelivery": null,
    "lowStockAlert": 5,
    "deliveryNote": "",
    "id": "prod_mwdt2ma80pcwaiut4",
    "subcategoryId": null,
    "categoryId": "cat_mens_football",
    "deliveryChargeInsideDhaka": 80,
    "assignedSleeves": [
      "slv_half"
    ],
    "isDeliveryChargeMandatory": false,
    "preorderCloseDate": null,
    "preorderDesc": "",
    "createdAt": "2026-11-12T17:12:16.207Z",
    "customBadge": "",
    "expectedArrival": null,
    "sizeMapping": {
      "M": {
        "width": 38,
        "height": 27
      },
      "L": {
        "height": 28,
        "width": 40
      },
      "4XL": {
        "height": 31,
        "width": 46
      },
      "XXL": {
        "width": 44,
        "height": 30
      },
      "XL": {
        "height": 29,
        "width": 42
      },
      "S": {
        "width": 36,
        "height": 26
      },
      "XS": {
        "width": 46,
        "height": 31
      },
      "3XL": {
        "height": 31,
        "width": 46
      }
    },
    "seoTitle": "",
    "discountStart": null,
    "assignedSizes": [
      "sz_s",
      "sz_m",
      "sz_l",
      "sz_xl",
      "sz_xxl",
      "sz_3xl",
      "sz_4xl"
    ],
    "sku": "ZNV-MWDT2MA7",
    "imageUrl": "img/products/prod_mwdt2ma80pcwaiut4.jpg",
    "name": "Arsenal Third Kit",
    "salePrice": 999,
    "isPublished": true,
    "customNameNumber": true,
    "sizeChartImage": "",
    "basePrice": 1150,
    "updatedAt": "2026-11-13T06:05:35.538Z",
    "advancePaymentMode": "cod_only",
    "preorderCapacity": 100,
    "categoryName": "Player Version",
    "customText": false,
    "preorderStatus": "OPEN",
    "hasCustomDelivery": false,
    "assignedPatches": [
      "patch_ucl"
    ],
    "collectionId": null,
    "description": "* সরাসরি চায়না থেকে ইমপোর্ট করা শতভাগ প্রিমিয়াম কোয়ালিটির অথেনটিক প্লেয়ার ভার্সন জার্সি।\n* অত্যন্ত হালকা, স্ট্রেচেবল এবং বাতাস চলাচলের উপযোগী ফেব্রিক দিয়ে তৈরি।\n* ক্লাব লোগো, ব্র্যান্ড লোগো এবং স্পনসর প্রিন্ট নিখুঁত ও টেকসই হিট-প্রেসড প্রযুক্তিতে বসানো।\n* প্লেয়ারদের জার্সির মতো বডি-হাগিং অ্যাথলেটিক স্লিম ফিট ও নিখুঁত সেলাইয়ের ফিনিশিং।\n* নিয়মিত খেলাধুলা কিংবা ক্যাজুয়াল আউটফিট হিসেবে পরার জন্য অত্যন্ত আরামদায়ক ও আকর্ষণীয়।",
    "discountValue": null,
    "customLogo": false,
    "team": "Arsenal",
    "preorderSold": 0,
    "customName": false,
    "isNewArrival": false,
    "tax": 0,
    "discountType": "percent",
    "seoDesc": "",
    "isFeatured": false,
    "preorderPrice": null,
    "slug": "arsenal-third-kit",
    "customNumber": false,
    "discountEnd": null,
    "sport": "Football",
    "isBestSeller": false,
    "compareAt": 1150,
    "status": "published",
    "image": "img/products/prod_mwdt2ma80pcwaiut4.jpg",
    "sizeChartType": "Player Edition",
    "shortDesc": "চায়না থেকে Imported অথেনটিক Player Version জার্সি",
    "customPrintPrice": null
  },
  {
    "isBestSeller": false,
    "customPrintPrice": null,
    "compareAt": 1150,
    "status": "published",
    "subcategoryId": "mw88n5w90qabal7hw",
    "lowStockAlert": 5,
    "sku": "ZNV-MWDSZQID",
    "isPublished": true,
    "shortDesc": "চায়না থেকে Imported অথেনটিক Player Version জার্সি",
    "stock": 0,
    "deliveryChargeInsideDhaka": 80,
    "name": "Arsenal Away Kit",
    "isFeatured": false,
    "customNumber": false,
    "sizeMapping": {
      "XS": {
        "width": 46,
        "height": 31
      },
      "S": {
        "width": 36,
        "height": 26
      },
      "L": {
        "height": 28,
        "width": 40
      },
      "XL": {
        "height": 29,
        "width": 42
      },
      "3XL": {
        "height": 31,
        "width": 46
      },
      "M": {
        "width": 38,
        "height": 27
      },
      "4XL": {
        "height": 31,
        "width": 46
      },
      "XXL": {
        "width": 44,
        "height": 30
      }
    },
    "isDeliveryChargeMandatory": false,
    "customBadge": "",
    "customName": false,
    "preorderSold": 0,
    "assignedSizes": [
      "sz_s",
      "sz_m",
      "sz_l",
      "sz_xl",
      "sz_xxl",
      "sz_3xl",
      "sz_4xl"
    ],
    "isNewArrival": false,
    "discountStart": null,
    "customLogo": false,
    "discountType": "percent",
    "sizeChartImage": "",
    "customText": false,
    "assignedPatches": [
      "patch_ucl"
    ],
    "id": "prod_mwdszqiet4d9u1fip",
    "categoryName": "Player Version",
    "preorderCloseDate": null,
    "collectionId": null,
    "slug": "arsenal-away-kit",
    "preorderCapacity": 100,
    "deliveryChargeOutsideDhaka": 130,
    "discountValue": null,
    "salePrice": 999,
    "basePrice": 1150,
    "seoTitle": "",
    "updatedAt": "2026-11-13T06:05:45.825Z",
    "customNameNumber": true,
    "imageUrl": "img/products/prod_mwdszqiet4d9u1fip.jpg",
    "preorderStatus": "OPEN",
    "discountEnd": null,
    "seoDesc": "",
    "expectedArrival": null,
    "advancePaymentMode": "cod_only",
    "preorderPrice": null,
    "createdAt": "2026-11-12T17:10:01.717Z",
    "assignedSleeves": [
      "slv_half"
    ],
    "preorderDesc": "",
    "image": "img/products/prod_mwdszqiet4d9u1fip.jpg",
    "hasCustomDelivery": false,
    "gender": "Unisex",
    "costPrice": 750,
    "description": "* সরাসরি চায়না থেকে ইমপোর্ট করা শতভাগ প্রিমিয়াম কোয়ালিটির অথেনটিক প্লেয়ার ভার্সন জার্সি।\n* অত্যন্ত হালকা, স্ট্রেচেবল এবং বাতাস চলাচলের উপযোগী ফেব্রিক দিয়ে তৈরি।\n* ক্লাব লোগো, ব্র্যান্ড লোগো এবং স্পনসর প্রিন্ট নিখুঁত ও টেকসই হিট-প্রেসড প্রযুক্তিতে বসানো।\n* প্লেয়ারদের জার্সির মতো বডি-হাগিং অ্যাথলেটিক স্লিম ফিট ও নিখুঁত সেলাইয়ের ফিনিশিং।\n* নিয়মিত খেলাধুলা কিংবা ক্যাজুয়াল আউটফিট হিসেবে পরার জন্য অত্যন্ত আরামদায়ক ও আকর্ষণীয়।",
    "sizeChartType": "Player Edition",
    "images": [
      {
        "url": "img/products/prod_mwdszqiet4d9u1fip.jpg",
        "alt": "Arsenal Away Kit",
        "isPrimary": true
      }
    ],
    "categoryId": "cat_mens_football",
    "isLimited": true,
    "expectedDelivery": null,
    "tax": 0,
    "deliveryNote": "",
    "isPreorder": false,
    "sport": "Football",
    "team": "Arsenal",
    "isArchived": false
  },
  {
    "assignedSizes": [
      "sz_s",
      "sz_m",
      "sz_l",
      "sz_xl",
      "sz_xxl",
      "sz_3xl",
      "sz_4xl"
    ],
    "collectionId": null,
    "isPublished": true,
    "deliveryChargeOutsideDhaka": 130,
    "categoryName": "Player Version",
    "team": "Arsenal",
    "sku": "ZNV-MWDR6RES",
    "customPrintPrice": null,
    "hasCustomDelivery": false,
    "sizeStocks": {
      "XXL": 1,
      "4XL": 0,
      "M": 1,
      "3XL": 0,
      "XL": 1,
      "L": 1,
      "S": 1
    },
    "discountStart": null,
    "discountType": "percent",
    "isPreorder": false,
    "isDeliveryChargeMandatory": false,
    "sizeMapping": {
      "M": {
        "height": 27,
        "width": 38
      },
      "XL": {
        "height": 29,
        "width": 42
      },
      "4XL": {
        "width": 46,
        "height": 31
      },
      "XXL": {
        "height": 30,
        "width": 44
      },
      "S": {
        "height": 26,
        "width": 36
      },
      "3XL": {
        "width": 46,
        "height": 31
      },
      "XS": {
        "height": 31,
        "width": 46
      },
      "L": {
        "width": 40,
        "height": 28
      }
    },
    "isArchived": false,
    "isNewArrival": false,
    "preorderSold": 0,
    "deliveryChargeInsideDhaka": 80,
    "status": "published",
    "categoryId": "cat_mens_football",
    "lowStockAlert": 5,
    "customNumber": false,
    "preorderStatus": "OPEN",
    "compareAt": 1150,
    "subcategoryId": "mw88n5w90qabal7hw",
    "shortDesc": "চায়না থেকে Imported অথেনটিক Player Version জার্সি",
    "advancePaymentMode": "default",
    "customBadge": "",
    "stock": 4,
    "slug": "arsenal-home-kit",
    "assignedPatches": [
      "patch_ucl"
    ],
    "isBestSeller": false,
    "customLogo": false,
    "customNameNumber": true,
    "deliveryNote": "",
    "id": "prod_mwdr6retnv03s299i",
    "sport": "Football",
    "customName": false,
    "createdAt": "2026-11-12T16:19:30.245Z",
    "preorderCapacity": 100,
    "preorderPrice": null,
    "isLimited": true,
    "image": "img/products/prod_mwdr6retnv03s299i.jpg",
    "preorderDesc": "",
    "sizeChartType": "Player Edition",
    "expectedArrival": null,
    "seoDesc": "",
    "costPrice": 750,
    "sizeChartImage": "",
    "preorderCloseDate": null,
    "customText": false,
    "discountEnd": null,
    "assignedSleeves": [
      "slv_half"
    ],
    "name": "Arsenal Home Kit",
    "basePrice": 1150,
    "salePrice": 999,
    "discountValue": null,
    "images": [
      {
        "url": "img/products/prod_mwdr6retnv03s299i.jpg",
        "alt": "Arsenal Home Kit",
        "isPrimary": true
      }
    ],
    "gender": "Unisex",
    "updatedAt": "2026-11-13T06:05:53.038Z",
    "isFeatured": false,
    "imageUrl": "img/products/prod_mwdr6retnv03s299i.jpg",
    "seoTitle": "",
    "tax": 0,
    "description": "* সরাসরি চায়না থেকে ইমপোর্ট করা শতভাগ প্রিমিয়াম কোয়ালিটির অথেনটিক প্লেয়ার ভার্সন জার্সি।\n* অত্যন্ত হালকা, স্ট্রেচেবল এবং বাতাস চলাচলের উপযোগী ফেব্রিক দিয়ে তৈরি।\n* ক্লাব লোগো, ব্র্যান্ড লোগো এবং স্পনসর প্রিন্ট নিখুঁত ও টেকসই হিট-প্রেসড প্রযুক্তিতে বসানো।\n* প্লেয়ারদের জার্সির মতো বডি-হাগিং অ্যাথলেটিক স্লিম ফিট ও নিখুঁত সেলাইয়ের ফিনিশিং।\n* নিয়মিত খেলাধুলা কিংবা ক্যাজুয়াল আউটফিট হিসেবে পরার জন্য অত্যন্ত আরামদায়ক ও আকর্ষণীয়।",
    "expectedDelivery": null
  },
  {
    "status": "published",
    "tax": 0,
    "isFeatured": false,
    "team": "Mancester City",
    "sizeChartType": "Player Edition",
    "customNumber": true,
    "customPrintPrice": null,
    "deliveryChargeOutsideDhaka": 130,
    "customBadge": "",
    "assignedSleeves": [
      "slv_half"
    ],
    "stock": 4,
    "isBestSeller": false,
    "preorderPrice": null,
    "expectedArrival": null,
    "categoryName": "Player Version",
    "seoTitle": "",
    "collectionId": null,
    "sizeMapping": {
      "S": {
        "width": 36,
        "height": 26
      },
      "L": {
        "width": 40,
        "height": 28
      },
      "4XL": {
        "width": 46,
        "height": 31
      },
      "XXL": {
        "width": 44,
        "height": 30
      },
      "XS": {
        "height": 31,
        "width": 46
      },
      "XL": {
        "height": 29,
        "width": 42
      },
      "3XL": {
        "width": 46,
        "height": 31
      },
      "M": {
        "width": 38,
        "height": 27
      }
    },
    "customText": false,
    "imageUrl": "",
    "compareAt": 1150,
    "id": "prod_mwafxrols41103ror",
    "customLogo": false,
    "isNewArrival": false,
    "hasCustomDelivery": false,
    "discountType": "percent",
    "discountValue": null,
    "customName": true,
    "advancePaymentMode": "default",
    "preorderStatus": "OPEN",
    "isPublished": true,
    "slug": "mancester-city-third-kit",
    "shortDesc": "চায়না থেকে Imported অথেনটিক Player Version জার্সি",
    "preorderSold": 0,
    "customNameNumber": true,
    "costPrice": null,
    "isLimited": true,
    "description": "* সরাসরি চায়না থেকে ইমপোর্ট করা শতভাগ প্রিমিয়াম কোয়ালিটির অথেনটিক প্লেয়ার ভার্সন জার্সি।\n* অত্যন্ত হালকা, স্ট্রেচেবল এবং বাতাস চলাচলের উপযোগী ফেব্রিক দিয়ে তৈরি।\n* ক্লাব লোগো, ব্র্যান্ড লোগো এবং স্পনসর প্রিন্ট নিখুঁত ও টেকসই হিট-প্রেসড প্রযুক্তিতে বসানো।\n* প্লেয়ারদের জার্সির মতো বডি-হাগিং অ্যাথলেটিক স্লিম ফিট ও নিখুঁত সেলাইয়ের ফিনিশিং।\n* নিয়মিত খেলাধুলা কিংবা ক্যাজুয়াল আউটফিট হিসেবে পরার জন্য অত্যন্ত আরামদায়ক ও আকর্ষণীয়।",
    "sizeChartImage": "",
    "preorderCapacity": 100,
    "assignedPatches": [
      "patch_ucl"
    ],
    "assignedSizes": [],
    "discountStart": null,
    "createdAt": "2026-11-10T08:41:16.389Z",
    "preorderCloseDate": null,
    "deliveryNote": "",
    "isDeliveryChargeMandatory": false,
    "seoDesc": "",
    "isPreorder": false,
    "name": "Mancester City Third Kit",
    "discountEnd": null,
    "isArchived": false,
    "image": "img/products/prod_mwafxrols41103ror.jpg",
    "deliveryChargeInsideDhaka": 80,
    "categoryId": "cat_mens_football",
    "images": [
      {
        "url": "img/products/prod_mwafxrols41103ror.jpg",
        "alt": "Mancester City Third Kit",
        "isPrimary": true
      }
    ],
    "lowStockAlert": 5,
    "sku": "ZNV-MWAFXROJ",
    "gender": "Unisex",
    "salePrice": 999,
    "subcategoryId": "mw88n5w90qabal7hw",
    "preorderDesc": "",
    "basePrice": 1150,
    "sizeStocks": {
      "M": 0,
      "XL": 1,
      "S": 1,
      "3XL": 0,
      "L": 1,
      "XXL": 1,
      "4XL": 0
    },
    "updatedAt": "2026-11-13T06:05:55.466Z",
    "sport": "Football",
    "expectedDelivery": null
  },
  {
    "imageUrl": "",
    "image": "img/products/prod_mwafvhg25iobn348j.jpg",
    "isPublished": true,
    "preorderPrice": null,
    "sizeChartImage": "",
    "advancePaymentMode": "default",
    "isFeatured": false,
    "seoTitle": "",
    "deliveryChargeOutsideDhaka": 130,
    "updatedAt": "2026-11-13T06:05:56.354Z",
    "sport": "Football",
    "sizeMapping": {
      "L": {
        "height": 28,
        "width": 40
      },
      "S": {
        "height": 26,
        "width": 36
      },
      "4XL": {
        "height": 31,
        "width": 46
      },
      "XXL": {
        "width": 44,
        "height": 30
      },
      "XS": {
        "height": 31,
        "width": 46
      },
      "M": {
        "width": 38,
        "height": 27
      },
      "3XL": {
        "width": 46,
        "height": 31
      },
      "XL": {
        "width": 42,
        "height": 29
      }
    },
    "assignedPatches": [
      "patch_ucl"
    ],
    "basePrice": 1150,
    "salePrice": 999,
    "expectedDelivery": null,
    "sizeChartType": "Player Edition",
    "customNameNumber": true,
    "customText": false,
    "preorderDesc": "",
    "customBadge": "",
    "isLimited": true,
    "discountValue": null,
    "costPrice": null,
    "sku": "ZNV-MWAFVHFY",
    "preorderCapacity": 100,
    "createdAt": "2026-11-10T08:39:29.810Z",
    "name": "Mancester City Away Kit",
    "customName": true,
    "hasCustomDelivery": false,
    "customLogo": false,
    "images": [
      {
        "url": "img/products/prod_mwafvhg25iobn348j.jpg",
        "alt": "Mancester City Away Kit",
        "isPrimary": true
      }
    ],
    "gender": "Unisex",
    "deliveryNote": "",
    "seoDesc": "",
    "assignedSleeves": [
      "slv_half"
    ],
    "isBestSeller": false,
    "discountStart": null,
    "assignedSizes": [],
    "status": "published",
    "shortDesc": "চায়না থেকে Imported অথেনটিক Player Version জার্সি",
    "team": "Mancester City",
    "customNumber": true,
    "discountEnd": null,
    "tax": 0,
    "compareAt": 1150,
    "categoryId": "cat_mens_football",
    "preorderSold": 0,
    "deliveryChargeInsideDhaka": 80,
    "isArchived": false,
    "discountType": "percent",
    "isDeliveryChargeMandatory": false,
    "slug": "mancester-city-away-kit",
    "preorderCloseDate": null,
    "lowStockAlert": 5,
    "subcategoryId": "mw88n5w90qabal7hw",
    "isNewArrival": false,
    "isPreorder": false,
    "customPrintPrice": null,
    "expectedArrival": null,
    "sizeStocks": {},
    "collectionId": null,
    "id": "prod_mwafvhg25iobn348j",
    "description": "* সরাসরি চায়না থেকে ইমপোর্ট করা শতভাগ প্রিমিয়াম কোয়ালিটির অথেনটিক প্লেয়ার ভার্সন জার্সি।\n* অত্যন্ত হালকা, স্ট্রেচেবল এবং বাতাস চলাচলের উপযোগী ফেব্রিক দিয়ে তৈরি।\n* ক্লাব লোগো, ব্র্যান্ড লোগো এবং স্পনসর প্রিন্ট নিখুঁত ও টেকসই হিট-প্রেসড প্রযুক্তিতে বসানো।\n* প্লেয়ারদের জার্সির মতো বডি-হাগিং অ্যাথলেটিক স্লিম ফিট ও নিখুঁত সেলাইয়ের ফিনিশিং।\n* নিয়মিত খেলাধুলা কিংবা ক্যাজুয়াল আউটফিট হিসেবে পরার জন্য অত্যন্ত আরামদায়ক ও আকর্ষণীয়।",
    "preorderStatus": "OPEN",
    "categoryName": "Player Version",
    "stock": 10
  },
  {
    "isFeatured": false,
    "basePrice": 1150,
    "isBestSeller": false,
    "discountValue": null,
    "salePrice": 999,
    "description": "* সরাসরি চায়না থেকে ইমপোর্ট করা শতভাগ প্রিমিয়াম কোয়ালিটির অথেনটিক প্লেয়ার ভার্সন জার্সি।\n* অত্যন্ত হালকা, স্ট্রেচেবল এবং বাতাস চলাচলের উপযোগী ফেব্রিক দিয়ে তৈরি।\n* ক্লাব লোগো, ব্র্যান্ড লোগো এবং স্পনসর প্রিন্ট নিখুঁত ও টেকসই হিট-প্রেসড প্রযুক্তিতে বসানো।\n* প্লেয়ারদের জার্সির মতো বডি-হাগিং অ্যাথলেটিক স্লিম ফিট ও নিখুঁত সেলাইয়ের ফিনিশিং।\n* নিয়মিত খেলাধুলা কিংবা ক্যাজুয়াল আউটফিট হিসেবে পরার জন্য অত্যন্ত আরামদায়ক ও আকর্ষণীয়।",
    "updatedAt": "2026-11-13T06:05:56.802Z",
    "name": "Mancester City Home Kit",
    "preorderStatus": "OPEN",
    "expectedDelivery": null,
    "preorderCloseDate": null,
    "assignedPatches": [
      "patch_ucl"
    ],
    "sku": "ZNV-MWAFSDQD",
    "customNumber": true,
    "id": "prod_mwafsdqhn64s1y787",
    "preorderCapacity": 100,
    "deliveryChargeOutsideDhaka": 130,
    "discountEnd": null,
    "preorderSold": 0,
    "preorderPrice": null,
    "images": [
      {
        "url": "img/products/prod_mwafsdqhn64s1y787.jpg",
        "alt": "Mancester City Home Kit",
        "isPrimary": true
      }
    ],
    "gender": "Unisex",
    "createdAt": "2026-11-10T08:37:05.033Z",
    "image": "img/products/prod_mwafsdqhn64s1y787.jpg",
    "customNameNumber": true,
    "isNewArrival": false,
    "customText": false,
    "discountType": "percent",
    "sizeChartType": "Player Edition",
    "isLimited": true,
    "customLogo": false,
    "seoDesc": "",
    "costPrice": null,
    "categoryName": "Player Version",
    "advancePaymentMode": "default",
    "customName": true,
    "sport": "Football",
    "collectionId": null,
    "assignedSleeves": [
      "slv_half"
    ],
    "subcategoryId": "mw88n5w90qabal7hw",
    "lowStockAlert": 5,
    "imageUrl": "",
    "compareAt": 1154,
    "hasCustomDelivery": false,
    "seoTitle": "",
    "shortDesc": "চায়না থেকে Imported অথেনটিক Player Version জার্সি",
    "slug": "mancester-city-home-kit",
    "stock": 10,
    "customBadge": "",
    "deliveryChargeInsideDhaka": 80,
    "status": "published",
    "isDeliveryChargeMandatory": false,
    "isPreorder": false,
    "customPrintPrice": null,
    "isArchived": false,
    "assignedSizes": [],
    "sizeChartImage": "",
    "sizeMapping": {
      "M": {
        "width": 38,
        "height": 27
      },
      "S": {
        "height": 26,
        "width": 36
      },
      "L": {
        "height": 28,
        "width": 40
      },
      "XL": {
        "width": 42,
        "height": 29
      },
      "XXL": {
        "width": 44,
        "height": 30
      },
      "4XL": {
        "width": 46,
        "height": 31
      },
      "XS": {
        "height": 31,
        "width": 46
      },
      "3XL": {
        "height": 31,
        "width": 46
      }
    },
    "discountStart": null,
    "tax": 0,
    "categoryId": "cat_mens_football",
    "preorderDesc": "",
    "team": "Mancester City",
    "expectedArrival": null,
    "deliveryNote": "",
    "sizeStocks": {},
    "isPublished": true
  },
  {
    "isNewArrival": false,
    "image": "img/products/prod_mw9setzepymsatr9c.jpg",
    "customBadge": "",
    "updatedAt": "2026-11-13T06:05:57.795Z",
    "discountType": "percent",
    "preorderSold": 0,
    "status": "published",
    "basePrice": 1150,
    "salePrice": 999,
    "categoryName": "Player Version",
    "sport": "Football",
    "collectionId": null,
    "preorderCapacity": 100,
    "preorderStatus": "OPEN",
    "discountValue": null,
    "customNameNumber": true,
    "assignedPatches": [
      "patch_ucl",
      "patch_trophy",
      "patch_respect",
      "patch_epl"
    ],
    "slug": "barcelona-4th-kit",
    "team": "Barcelona",
    "seoTitle": "",
    "isArchived": false,
    "expectedDelivery": null,
    "isPreorder": false,
    "createdAt": "2026-11-09T21:42:41.738Z",
    "hasCustomDelivery": false,
    "sizeChartType": "Player Edition",
    "isBestSeller": false,
    "isPublished": true,
    "categoryId": "cat_mens_football",
    "imageUrl": "",
    "preorderPrice": null,
    "sku": "ZNV-MW9SETZB",
    "customNumber": true,
    "costPrice": null,
    "sizeStocks": {},
    "isLimited": true,
    "sizeMapping": {
      "M": {
        "width": 38,
        "height": 27
      },
      "XXL": {
        "height": 30,
        "width": 44
      },
      "4XL": {
        "width": 46,
        "height": 31
      },
      "3XL": {
        "height": 31,
        "width": 46
      },
      "L": {
        "width": 40,
        "height": 28
      },
      "XL": {
        "height": 29,
        "width": 42
      },
      "S": {
        "height": 26,
        "width": 36
      },
      "XS": {
        "width": 46,
        "height": 31
      }
    },
    "id": "prod_mw9setzepymsatr9c",
    "deliveryChargeOutsideDhaka": 130,
    "preorderDesc": "",
    "shortDesc": "চায়না থেকে Imported অথেনটিক Player Version জার্সি",
    "tax": 0,
    "isFeatured": false,
    "name": "Barcelona 4th Kit",
    "assignedSleeves": [
      "slv_half",
      "mw9mgrcce7v5jp20j",
      "slv_full"
    ],
    "compareAt": 1150,
    "deliveryNote": "",
    "description": "* সরাসরি চায়না থেকে ইমপোর্ট করা শতভাগ প্রিমিয়াম কোয়ালিটির অথেনটিক প্লেয়ার ভার্সন জার্সি।\n* অত্যন্ত হালকা, স্ট্রেচেবল এবং বাতাস চলাচলের উপযোগী ফেব্রিক দিয়ে তৈরি।\n* ক্লাব লোগো, ব্র্যান্ড লোগো এবং স্পনসর প্রিন্ট নিখুঁত ও টেকসই হিট-প্রেসড প্রযুক্তিতে বসানো।\n* প্লেয়ারদের জার্সির মতো বডি-হাগিং অ্যাথলেটিক স্লিম ফিট ও নিখুঁত সেলাইয়ের ফিনিশিং।\n* নিয়মিত খেলাধুলা কিংবা ক্যাজুয়াল আউটফিট হিসেবে পরার জন্য অত্যন্ত আরামদায়ক ও আকর্ষণীয়।",
    "customPrintPrice": null,
    "subcategoryId": "mw88n5w90qabal7hw",
    "lowStockAlert": 5,
    "sizeChartImage": "",
    "deliveryChargeInsideDhaka": 80,
    "seoDesc": "",
    "isDeliveryChargeMandatory": false,
    "customText": false,
    "expectedArrival": null,
    "discountEnd": null,
    "discountStart": null,
    "customLogo": false,
    "advancePaymentMode": "default",
    "preorderCloseDate": null,
    "images": [
      {
        "url": "img/products/prod_mw9setzepymsatr9c.jpg",
        "alt": "Barcelona 4th Kit",
        "isPrimary": true
      }
    ],
    "customName": true,
    "stock": 3,
    "gender": "Unisex",
    "assignedSizes": []
  },
  {
    "preorderDesc": "",
    "categoryId": "cat_mens_football",
    "createdAt": "2026-11-09T21:39:04.743Z",
    "expectedDelivery": null,
    "isArchived": false,
    "isPreorder": false,
    "discountEnd": null,
    "status": "published",
    "seoDesc": "",
    "assignedSizes": [],
    "isDeliveryChargeMandatory": false,
    "imageUrl": "",
    "deliveryNote": "",
    "sizeStocks": {},
    "preorderStatus": "OPEN",
    "isLimited": false,
    "seoTitle": "",
    "slug": "barcelona-third-kit",
    "discountStart": null,
    "deliveryChargeInsideDhaka": 80,
    "costPrice": null,
    "assignedPatches": [
      "patch_ucl",
      "patch_trophy"
    ],
    "team": "Barcelona",
    "updatedAt": "2026-11-13T06:05:58.445Z",
    "salePrice": 999,
    "basePrice": 1150,
    "sport": "Football",
    "preorderCapacity": 100,
    "description": "* সরাসরি চায়না থেকে ইমপোর্ট করা শতভাগ প্রিমিয়াম কোয়ালিটির অথেনটিক প্লেয়ার ভার্সন জার্সি।\n* অত্যন্ত হালকা, স্ট্রেচেবল এবং বাতাস চলাচলের উপযোগী ফেব্রিক দিয়ে তৈরি।\n* ক্লাব লোগো, ব্র্যান্ড লোগো এবং স্পনসর প্রিন্ট নিখুঁত ও টেকসই হিট-প্রেসড প্রযুক্তিতে বসানো।\n* প্লেয়ারদের জার্সির মতো বডি-হাগিং অ্যাথলেটিক স্লিম ফিট ও নিখুঁত সেলাইয়ের ফিনিশিং।\n* নিয়মিত খেলাধুলা কিংবা ক্যাজুয়াল আউটফিট হিসেবে পরার জন্য অত্যন্ত আরামদায়ক ও আকর্ষণীয়।",
    "lowStockAlert": 5,
    "subcategoryId": "mw88n5w90qabal7hw",
    "hasCustomDelivery": false,
    "advancePaymentMode": "default",
    "id": "prod_mw9sa6jrx2oh028td",
    "image": "img/products/prod_mw9sa6jrx2oh028td.jpg",
    "customNameNumber": true,
    "deliveryChargeOutsideDhaka": 130,
    "tax": 0,
    "name": "Barcelona Third Kit",
    "discountType": "percent",
    "stock": 10,
    "isNewArrival": false,
    "sizeChartType": "Player Edition",
    "customText": false,
    "preorderSold": 0,
    "isPublished": true,
    "expectedArrival": null,
    "sku": "ZNV-MW9SA6JN",
    "collectionId": null,
    "categoryName": "Player Version",
    "customName": true,
    "customLogo": false,
    "preorderPrice": null,
    "sizeMapping": {
      "S": {
        "width": 36,
        "height": 26
      },
      "L": {
        "height": 28,
        "width": 40
      },
      "4XL": {
        "height": 31,
        "width": 46
      },
      "XXL": {
        "width": 44,
        "height": 30
      },
      "XS": {
        "width": 46,
        "height": 31
      },
      "XL": {
        "width": 42,
        "height": 29
      },
      "3XL": {
        "height": 31,
        "width": 46
      },
      "M": {
        "width": 38,
        "height": 27
      }
    },
    "images": [
      {
        "url": "img/products/prod_mw9sa6jrx2oh028td.jpg",
        "alt": "Barcelona Third Kit",
        "isPrimary": true
      }
    ],
    "shortDesc": "চায়না থেকে Imported অথেনটিক Player Version জার্সি",
    "gender": "Unisex",
    "customBadge": "",
    "preorderCloseDate": null,
    "sizeChartImage": "",
    "isFeatured": false,
    "compareAt": 1150,
    "isBestSeller": true,
    "customNumber": true,
    "customPrintPrice": null,
    "discountValue": null,
    "assignedSleeves": [
      "slv_half"
    ]
  },
  {
    "seoDesc": "",
    "preorderCloseDate": null,
    "preorderDesc": "",
    "deliveryChargeOutsideDhaka": 130,
    "sport": "Football",
    "sizeStocks": {},
    "discountValue": null,
    "deliveryNote": "",
    "isPreorder": false,
    "salePrice": 999,
    "basePrice": 1150,
    "isArchived": false,
    "assignedSleeves": [
      "slv_half"
    ],
    "team": "Barcelona",
    "image": "img/products/prod_mw9s5gftya80x3w3n.jpg",
    "categoryId": "cat_mens_football",
    "discountEnd": null,
    "updatedAt": "2026-11-13T06:05:59.244Z",
    "isLimited": false,
    "preorderPrice": null,
    "costPrice": null,
    "slug": "barceleona-away-kit",
    "customPrintPrice": null,
    "expectedArrival": null,
    "sizeChartImage": "",
    "id": "prod_mw9s5gftya80x3w3n",
    "gender": "Unisex",
    "advancePaymentMode": "default",
    "images": [
      {
        "url": "img/products/prod_mw9s5gftya80x3w3n.jpg",
        "alt": "Barceleona Away Kit",
        "isPrimary": true
      }
    ],
    "tax": 0,
    "createdAt": "2026-11-09T21:35:24.281Z",
    "description": "* সরাসরি চায়না থেকে ইমপোর্ট করা শতভাগ প্রিমিয়াম কোয়ালিটির অথেনটিক প্লেয়ার ভার্সন জার্সি।\n* অত্যন্ত হালকা, স্ট্রেচেবল এবং বাতাস চলাচলের উপযোগী ফেব্রিক দিয়ে তৈরি।\n* ক্লাব লোগো, ব্র্যান্ড লোগো এবং স্পনসর প্রিন্ট নিখুঁত ও টেকসই হিট-প্রেসড প্রযুক্তিতে বসানো।\n* প্লেয়ারদের জার্সির মতো বডি-হাগিং অ্যাথলেটিক স্লিম ফিট ও নিখুঁত সেলাইয়ের ফিনিশিং।\n* নিয়মিত খেলাধুলা কিংবা ক্যাজুয়াল আউটফিট হিসেবে পরার জন্য অত্যন্ত আরামদায়ক ও আকর্ষণীয়।",
    "sizeChartType": "Player Edition",
    "customLogo": false,
    "assignedPatches": [
      "patch_ucl"
    ],
    "status": "published",
    "isNewArrival": false,
    "sku": "ZNV-MW9S5GFR",
    "discountType": "percent",
    "isPublished": true,
    "lowStockAlert": 5,
    "customName": false,
    "subcategoryId": "mw88n5w90qabal7hw",
    "preorderSold": 0,
    "sizeMapping": {
      "XL": {
        "width": 42,
        "height": 29
      },
      "M": {
        "width": 38,
        "height": 27
      },
      "XS": {
        "width": 46,
        "height": 31
      },
      "3XL": {
        "height": 31,
        "width": 46
      },
      "L": {
        "height": 28,
        "width": 40
      },
      "S": {
        "height": 26,
        "width": 36
      },
      "4XL": {
        "width": 46,
        "height": 31
      },
      "XXL": {
        "width": 44,
        "height": 30
      }
    },
    "categoryName": "Player Version",
    "preorderStatus": "OPEN",
    "compareAt": 1150,
    "hasCustomDelivery": false,
    "collectionId": null,
    "shortDesc": "চায়না থেকে Imported অথেনটিক Player Version জার্সি",
    "expectedDelivery": null,
    "customText": false,
    "stock": 10,
    "customNameNumber": true,
    "imageUrl": "",
    "discountStart": null,
    "assignedSizes": [
      "sz_s",
      "sz_m",
      "sz_l",
      "sz_xl",
      "sz_xxl",
      "sz_3xl",
      "sz_4xl"
    ],
    "isBestSeller": true,
    "seoTitle": "",
    "customBadge": "",
    "preorderCapacity": 100,
    "isFeatured": false,
    "deliveryChargeInsideDhaka": 80,
    "customNumber": false,
    "isDeliveryChargeMandatory": false,
    "name": "Barceleona Away Kit"
  },
  {
    "sizeChartType": "Player Edition",
    "advancePaymentMode": "default",
    "collectionId": null,
    "compareAt": 1150,
    "categoryName": "Player Version",
    "description": "* সরাসরি চায়না থেকে ইমপোর্ট করা শতভাগ প্রিমিয়াম কোয়ালিটির অথেনটিক প্লেয়ার ভার্সন জার্সি।\n* অত্যন্ত হালকা, স্ট্রেচেবল এবং বাতাস চলাচলের উপযোগী ফেব্রিক দিয়ে তৈরি।\n* ক্লাব লোগো, ব্র্যান্ড লোগো এবং স্পনসর প্রিন্ট নিখুঁত ও টেকসই হিট-প্রেসড প্রযুক্তিতে বসানো।\n* প্লেয়ারদের জার্সির মতো বডি-হাগিং অ্যাথলেটিক স্লিম ফিট ও নিখুঁত সেলাইয়ের ফিনিশিং।\n* নিয়মিত খেলাধুলা কিংবা ক্যাজুয়াল আউটফিট হিসেবে পরার জন্য অত্যন্ত আরামদায়ক ও আকর্ষণীয়।",
    "shortDesc": "চায়না থেকে Imported অথেনটিক Player Version জার্সি",
    "discountType": "percent",
    "status": "published",
    "isNewArrival": false,
    "isFeatured": false,
    "slug": "barcelona-home-kit",
    "preorderPrice": null,
    "preorderSold": 0,
    "customNumber": false,
    "customName": false,
    "isDeliveryChargeMandatory": false,
    "team": "Barcelona",
    "deliveryChargeInsideDhaka": 80,
    "customLogo": false,
    "discountEnd": null,
    "hasCustomDelivery": false,
    "assignedPatches": [
      "patch_ucl"
    ],
    "customText": false,
    "discountValue": null,
    "imageUrl": "",
    "tax": 0,
    "customPrintPrice": null,
    "seoTitle": "",
    "sizeChartImage": "",
    "stock": 10,
    "isBestSeller": true,
    "preorderStatus": "OPEN",
    "name": "Barcelona Home Kit",
    "salePrice": 999,
    "image": "img/products/prod_mw9s02zyhy7iilqo4.jpg",
    "basePrice": 1150,
    "deliveryNote": "",
    "id": "prod_mw9s02zyhy7iilqo4",
    "sku": "ZNV-MW9S02ZV",
    "expectedDelivery": null,
    "updatedAt": "2026-11-13T06:06:00.185Z",
    "seoDesc": "",
    "preorderDesc": "",
    "assignedSizes": [
      "sz_s",
      "sz_m",
      "sz_l",
      "sz_xl",
      "sz_xxl",
      "sz_3xl",
      "sz_4xl"
    ],
    "sport": "Football",
    "customBadge": "",
    "discountStart": null,
    "expectedArrival": null,
    "sizeStocks": {},
    "images": [
      {
        "url": "img/products/prod_mw9s02zyhy7iilqo4.jpg",
        "alt": "Barcelona Home Kit",
        "isPrimary": true
      }
    ],
    "sizeMapping": {
      "L": {
        "width": 40,
        "height": 28
      },
      "S": {
        "width": 36,
        "height": 26
      },
      "XXL": {
        "height": 30,
        "width": 44
      },
      "4XL": {
        "width": 46,
        "height": 31
      },
      "XS": {
        "width": 46,
        "height": 31
      },
      "3XL": {
        "width": 46,
        "height": 31
      },
      "XL": {
        "height": 29,
        "width": 42
      },
      "M": {
        "width": 38,
        "height": 27
      }
    },
    "gender": "Unisex",
    "deliveryChargeOutsideDhaka": 130,
    "assignedSleeves": [
      "slv_half"
    ],
    "createdAt": "2026-11-09T21:31:13.582Z",
    "isLimited": false,
    "isPublished": true,
    "customNameNumber": true,
    "subcategoryId": "mw88n5w90qabal7hw",
    "categoryId": "cat_mens_football",
    "lowStockAlert": 5,
    "costPrice": null,
    "isPreorder": false,
    "preorderCloseDate": null,
    "preorderCapacity": 100,
    "isArchived": false
  },
  {
    "salePrice": 999,
    "basePrice": 1150,
    "customName": false,
    "customLogo": false,
    "categoryName": "Player Version",
    "preorderCloseDate": null,
    "updatedAt": "2026-11-13T06:06:00.983Z",
    "sizeMapping": {
      "M": {
        "width": 38,
        "height": 27
      },
      "XL": {
        "width": 42,
        "height": 29
      },
      "XXL": {
        "width": 44,
        "height": 30
      },
      "4XL": {
        "height": 31,
        "width": 46
      },
      "L": {
        "width": 40,
        "height": 28
      },
      "S": {
        "height": 26,
        "width": 36
      },
      "3XL": {
        "width": 46,
        "height": 31
      },
      "XS": {
        "width": 46,
        "height": 31
      }
    },
    "collectionId": null,
    "name": "Real Madrid Third Kit",
    "customText": false,
    "preorderStatus": "OPEN",
    "stock": 10,
    "preorderSold": 0,
    "discountValue": null,
    "assignedPatches": [
      "patch_ucl"
    ],
    "sku": "ZNV-MW9RU5DK",
    "isPublished": true,
    "isNewArrival": false,
    "discountType": "percent",
    "sizeChartType": "Player Edition",
    "createdAt": "2026-11-09T21:26:36.730Z",
    "customNumber": false,
    "customPrintPrice": null,
    "customBadge": "",
    "isBestSeller": true,
    "images": [
      {
        "url": "img/products/prod_mw9ru5dmlxx3y3v5l.jpg",
        "alt": "Real Madrid Third Kit",
        "isPrimary": true
      }
    ],
    "gender": "Unisex",
    "isLimited": false,
    "costPrice": null,
    "seoDesc": "",
    "isFeatured": false,
    "preorderPrice": null,
    "deliveryChargeOutsideDhaka": 130,
    "status": "published",
    "discountEnd": null,
    "assignedSleeves": [
      "slv_half"
    ],
    "sizeStocks": {},
    "imageUrl": "",
    "deliveryChargeInsideDhaka": 80,
    "compareAt": 1150,
    "slug": "real-madrid-third-kit",
    "deliveryNote": "",
    "isDeliveryChargeMandatory": false,
    "shortDesc": "চায়না থেকে Imported অথেনটিক Player Version জার্সি",
    "seoTitle": "",
    "lowStockAlert": 5,
    "categoryId": "cat_mens_football",
    "subcategoryId": "mw88n5w90qabal7hw",
    "isPreorder": false,
    "expectedDelivery": null,
    "hasCustomDelivery": false,
    "isArchived": false,
    "preorderDesc": "",
    "description": "* সরাসরি চায়না থেকে ইমপোর্ট করা শতভাগ প্রিমিয়াম কোয়ালিটির অথেনটিক প্লেয়ার ভার্সন জার্সি।\n* অত্যন্ত হালকা, স্ট্রেচেবল এবং বাতাস চলাচলের উপযোগী ফেব্রিক দিয়ে তৈরি।\n* ক্লাব লোগো, ব্র্যান্ড লোগো এবং স্পনসর প্রিন্ট নিখুঁত ও টেকসই হিট-প্রেসড প্রযুক্তিতে বসানো।\n* প্লেয়ারদের জার্সির মতো বডি-হাগিং অ্যাথলেটিক স্লিম ফিট ও নিখুঁত সেলাইয়ের ফিনিশিং।\n* নিয়মিত খেলাধুলা কিংবা ক্যাজুয়াল আউটফিট হিসেবে পরার জন্য অত্যন্ত আরামদায়ক ও আকর্ষণীয়।",
    "customNameNumber": true,
    "id": "prod_mw9ru5dmlxx3y3v5l",
    "tax": 0,
    "image": "img/products/prod_mw9ru5dmlxx3y3v5l.jpg",
    "preorderCapacity": 100,
    "sizeChartImage": "",
    "assignedSizes": [
      "sz_s",
      "sz_m",
      "sz_l",
      "sz_xl",
      "sz_xxl",
      "sz_3xl",
      "sz_4xl"
    ],
    "expectedArrival": null,
    "team": "Real Madrid",
    "advancePaymentMode": "default",
    "sport": "Football",
    "discountStart": null
  },
  {
    "isLimited": false,
    "sport": "Football",
    "assignedSizes": [
      "sz_s",
      "sz_m",
      "sz_l",
      "sz_xl",
      "sz_xxl",
      "sz_3xl",
      "sz_4xl"
    ],
    "preorderCapacity": 100,
    "costPrice": null,
    "status": "published",
    "team": "Real Madrid",
    "preorderCloseDate": null,
    "customText": false,
    "customNameNumber": true,
    "discountStart": null,
    "customLogo": false,
    "description": "* সরাসরি চায়না থেকে ইমপোর্ট করা শতভাগ প্রিমিয়াম কোয়ালিটির অথেনটিক প্লেয়ার ভার্সন জার্সি।\n* অত্যন্ত হালকা, স্ট্রেচেবল এবং বাতাস চলাচলের উপযোগী ফেব্রিক দিয়ে তৈরি।\n* ক্লাব লোগো, ব্র্যান্ড লোগো এবং স্পনসর প্রিন্ট নিখুঁত ও টেকসই হিট-প্রেসড প্রযুক্তিতে বসানো।\n* প্লেয়ারদের জার্সির মতো বডি-হাগিং অ্যাথলেটিক স্লিম ফিট ও নিখুঁত সেলাইয়ের ফিনিশিং।\n* নিয়মিত খেলাধুলা কিংবা ক্যাজুয়াল আউটফিট হিসেবে পরার জন্য অত্যন্ত আরামদায়ক ও আকর্ষণীয়।",
    "tax": 0,
    "image": "img/products/prod_mw9rkmru2ps3wt4hb.jpg",
    "customName": false,
    "createdAt": "2026-11-09T21:19:12.714Z",
    "preorderStatus": "OPEN",
    "assignedPatches": [
      "patch_ucl"
    ],
    "isFeatured": false,
    "lowStockAlert": 5,
    "subcategoryId": "mw88n5w90qabal7hw",
    "preorderDesc": "",
    "deliveryNote": "",
    "salePrice": 999,
    "basePrice": 1150,
    "expectedDelivery": null,
    "deliveryChargeInsideDhaka": 80,
    "discountEnd": null,
    "slug": "real-madrid-away",
    "isDeliveryChargeMandatory": false,
    "updatedAt": "2026-11-13T06:06:01.659Z",
    "isPreorder": false,
    "customPrintPrice": null,
    "customBadge": "",
    "isArchived": false,
    "assignedSleeves": [
      "slv_half"
    ],
    "isBestSeller": true,
    "preorderPrice": null,
    "categoryId": "cat_mens_football",
    "advancePaymentMode": "default",
    "sizeChartType": "Player Edition",
    "customNumber": false,
    "imageUrl": "",
    "hasCustomDelivery": false,
    "sizeStocks": {},
    "seoTitle": "",
    "sizeChartImage": "",
    "seoDesc": "",
    "isNewArrival": false,
    "sku": "ZNV-MW9RKMRS",
    "discountType": "percent",
    "discountValue": null,
    "stock": 20,
    "deliveryChargeOutsideDhaka": 130,
    "isPublished": true,
    "name": "Real Madrid Away Kit",
    "id": "prod_mw9rkmru2ps3wt4hb",
    "preorderSold": 0,
    "expectedArrival": null,
    "categoryName": "Player Version",
    "compareAt": 1150,
    "gender": "Unisex",
    "images": [
      {
        "url": "img/products/prod_mw9rkmru2ps3wt4hb.jpg",
        "alt": "Real Madrid Away Kit",
        "isPrimary": true
      }
    ],
    "collectionId": null,
    "sizeMapping": {
      "XS": {
        "height": 31,
        "width": 46
      },
      "L": {
        "width": 40,
        "height": 28
      },
      "XL": {
        "width": 42,
        "height": 29
      },
      "S": {
        "width": 36,
        "height": 26
      },
      "3XL": {
        "height": 31,
        "width": 46
      },
      "4XL": {
        "width": 46,
        "height": 31
      },
      "XXL": {
        "width": 44,
        "height": 30
      },
      "M": {
        "width": 38,
        "height": 27
      }
    },
    "shortDesc": "চায়না থেকে Imported অথেনটিক Player Version জার্সি"
  },
  {
    "customNameNumber": false,
    "salePrice": 999,
    "preorderCloseDate": null,
    "basePrice": 1150,
    "sizeStocks": {},
    "team": "Real Madrid",
    "preorderCapacity": 100,
    "tax": 0,
    "updatedAt": "2026-11-13T06:06:02.391Z",
    "isPublished": true,
    "deliveryChargeInsideDhaka": 80,
    "assignedSizes": [
      "sz_s",
      "sz_m",
      "sz_l",
      "sz_xl",
      "sz_xxl",
      "sz_3xl",
      "sz_4xl"
    ],
    "categoryId": "cat_mens_football",
    "stock": 10,
    "sizeMapping": {
      "M": {
        "width": 38,
        "height": 27
      },
      "XL": {
        "height": 29,
        "width": 42
      },
      "XXL": {
        "width": 44,
        "height": 30
      },
      "4XL": {
        "width": 46,
        "height": 31
      },
      "L": {
        "width": 40,
        "height": 28
      },
      "XS": {
        "width": 46,
        "height": 31
      },
      "3XL": {
        "height": 31,
        "width": 46
      },
      "S": {
        "width": 36,
        "height": 26
      }
    },
    "isPreorder": false,
    "preorderStatus": "OPEN",
    "discountStart": null,
    "isDeliveryChargeMandatory": false,
    "isArchived": false,
    "assignedPatches": [],
    "customBadge": "",
    "createdAt": "2026-11-08T20:24:40.612Z",
    "preorderDesc": "",
    "images": [
      {
        "url": "img/products/mw8a6nc4ecqhhqgcv.jpg",
        "alt": "Real Madrid Home",
        "isPrimary": true
      }
    ],
    "gender": "Unisex",
    "isLimited": false,
    "lowStockAlert": 5,
    "subcategoryId": "mw88n5w90qabal7hw",
    "costPrice": null,
    "deliveryNote": "",
    "seoDesc": "",
    "slug": "real-madrid-home",
    "expectedDelivery": null,
    "status": "published",
    "isBestSeller": true,
    "imageUrl": "",
    "customName": true,
    "compareAt": 1150,
    "sizeChartType": "Player Edition",
    "customLogo": false,
    "expectedArrival": null,
    "customPrintPrice": null,
    "shortDesc": "চায়না থেকে Imported অথেনটিক Player Version জার্সি",
    "seoTitle": "",
    "customText": false,
    "hasCustomDelivery": false,
    "id": "mw8a6nc4ecqhhqgcv",
    "discountEnd": null,
    "customNumber": true,
    "preorderPrice": null,
    "name": "Real Madrid Home",
    "advancePaymentMode": "default",
    "sizeChartImage": "",
    "preorderSold": 0,
    "image": "img/products/mw8a6nc4ecqhhqgcv.jpg",
    "isNewArrival": false,
    "discountType": "percent",
    "deliveryChargeOutsideDhaka": 130,
    "description": "* সরাসরি চায়না থেকে ইমপোর্ট করা শতভাগ প্রিমিয়াম কোয়ালিটির অথেনটিক প্লেয়ার ভার্সন জার্সি।\n* অত্যন্ত হালকা, স্ট্রেচেবল এবং বাতাস চলাচলের উপযোগী ফেব্রিক দিয়ে তৈরি।\n* ক্লাব লোগো, ব্র্যান্ড লোগো এবং স্পনসর প্রিন্ট নিখুঁত ও টেকসই হিট-প্রেসড প্রযুক্তিতে বসানো।\n* প্লেয়ারদের জার্সির মতো বডি-হাগিং অ্যাথলেটিক স্লিম ফিট ও নিখুঁত সেলাইয়ের ফিনিশিং।\n* নিয়মিত খেলাধুলা কিংবা ক্যাজুয়াল আউটফিট হিসেবে পরার জন্য অত্যন্ত আরামদায়ক ও আকর্ষণীয়।",
    "discountValue": null,
    "isFeatured": false,
    "sku": "ZNV-MW8A6NC3",
    "categoryName": "Player Version",
    "assignedSleeves": [
      "slv_half"
    ],
    "collectionId": null,
    "sport": "Football"
  }
];

if (typeof window !== 'undefined') {
  window.ACTIVE_CATALOG_BASELINE = ACTIVE_CATALOG_BASELINE;
}

// Global Universal HTML Escaper (Prevents ReferenceError across all views)
function escapeHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
if (typeof window !== 'undefined') {
  window.escapeHtml = escapeHtml;
}

// Test & Junk Product Filter
function isTestOrJunkProduct(p) {
  if (!p || typeof p !== 'object') return true;
  const name = String(p.name || '').toLowerCase();
  const id = String(p.id || '').toLowerCase();
  const sku = String(p.sku || '').toLowerCase();
  if (name.includes('[test sync]') || name.includes('test sync')) return true;
  if (id === 'prod_876_user' || id === '876' || sku.includes('o887')) return true;
  if (['101','102','103','104','105','106','107','108','109','110','111','112','113','114','115','116'].includes(id)) return true;
  return false;
}
if (typeof window !== 'undefined') {
  window.isTestOrJunkProduct = isTestOrJunkProduct;
}

// Global Size Code Normalizer (e.g. sz_xl_mw935... -> XL, sz_m -> M)
function resolveSizeCode(val) {
  if (!val) return '';
  if (typeof val === 'object') return (val.code || val.name || '').toUpperCase().trim();
  const str = String(val).trim();
  if (typeof DB !== 'undefined' && DB.sizes && typeof DB.sizes.all === 'function') {
    const found = DB.sizes.all().find(x => x.id === str || x.code === str || (x.code && x.code.toUpperCase() === str.toUpperCase()));
    if (found && found.code) return found.code.toUpperCase().trim();
  }
  const match = str.match(/^sz_([a-z0-9]+)_/i);
  if (match && match[1]) return match[1].toUpperCase();
  const matchSimple = str.match(/^sz_([a-z0-9]+)$/i);
  if (matchSimple && matchSimple[1]) return matchSimple[1].toUpperCase();
  return str.toUpperCase();
}
if (typeof window !== 'undefined') {
  window.resolveSizeCode = resolveSizeCode;
}

// Helper: Safely resolve size stock quantity
function getSizeStockQty(curSizeStocks, sizeCode, fallbackTotal = 10) {
  if (!curSizeStocks || typeof curSizeStocks !== 'object' || Object.keys(curSizeStocks).length === 0) {
    return (typeof fallbackTotal === 'number') ? fallbackTotal : 10;
  }
  const targetCode = resolveSizeCode(sizeCode);
  if (curSizeStocks[targetCode] !== undefined) {
    return Math.max(0, parseInt(curSizeStocks[targetCode]) || 0);
  }
  for (const [k, v] of Object.entries(curSizeStocks)) {
    if (resolveSizeCode(k) === targetCode || k.toUpperCase() === targetCode) {
      return Math.max(0, parseInt(v) || 0);
    }
  }
  return (typeof fallbackTotal === 'number') ? fallbackTotal : 10;
}
if (typeof window !== 'undefined') {
  window.getSizeStockQty = getSizeStockQty;
}

function hasSizeStockConfigured(curSizeStocks, sizeCode) {
  if (!curSizeStocks || typeof curSizeStocks !== 'object' || Object.keys(curSizeStocks).length === 0) return false;
  const targetCode = resolveSizeCode(sizeCode);
  if (curSizeStocks[targetCode] !== undefined) return true;
  for (const k of Object.keys(curSizeStocks)) {
    if (resolveSizeCode(k) === targetCode || k.toUpperCase() === targetCode) return true;
  }
  return false;
}
if (typeof window !== 'undefined') {
  window.hasSizeStockConfigured = hasSizeStockConfigured;
}

// Initialize in-memory cache with active catalog baseline for instant 0ms first paint
try {
  const delRaw = localStorage.getItem(`${DB_VERSION}_deleted_product_ids`);
  let deletedIds = new Set();
  if (delRaw) {
    try {
      const parsed = JSON.parse(delRaw);
      if (Array.isArray(parsed)) {
        parsed.forEach(id => deletedIds.add(String(id).trim().toLowerCase()));
      }
    } catch(e){}
  }

  const initRaw = localStorage.getItem(`${DB_VERSION}_products`);
  let initProds = [];
  if (initRaw) {
    try { initProds = JSON.parse(initRaw); } catch(e){}
  }

  let finalCatalog = [];

  if (Array.isArray(initProds) && initProds.length > 0) {
    // 1. Authoritative local state from previous session/sync (NEVER resurrects deleted items)
    finalCatalog = initProds.filter(p => p && p.id && !deletedIds.has(String(p.id).trim().toLowerCase()) && !isTestOrJunkProduct(p));
  } else if (Array.isArray(ACTIVE_CATALOG_BASELINE) && ACTIVE_CATALOG_BASELINE.length > 0) {
    // 2. Cold start on brand-new device: seed cleanly from live baseline
    finalCatalog = ACTIVE_CATALOG_BASELINE.filter(p => p && p.id && !deletedIds.has(String(p.id).trim().toLowerCase()) && !isTestOrJunkProduct(p));
    try { localStorage.setItem(`${DB_VERSION}_products`, JSON.stringify(finalCatalog)); } catch(e){}
  }

  finalCatalog.sort((a, b) => {
    const tA = (a.createdAt ? new Date(a.createdAt).getTime() : 0) || 0;
    const tB = (b.createdAt ? new Date(b.createdAt).getTime() : 0) || 0;
    return tB - tA; // Always newest at top
  });

  window._ZENVY_PRODUCTS_CACHE = finalCatalog;
} catch(e) {
  window._ZENVY_PRODUCTS_CACHE = JSON.parse(JSON.stringify(ACTIVE_CATALOG_BASELINE || []));
}

// ──────────────────────────────────────────────────────────
// Core Storage Engine
// ──────────────────────────────────────────────────────────
const Store = {
  get(key, def = []) {
    if (key === 'products' && Array.isArray(window._ZENVY_PRODUCTS_CACHE) && window._ZENVY_PRODUCTS_CACHE.length > 0) {
      return window._ZENVY_PRODUCTS_CACHE.filter(p => !isTestOrJunkProduct(p));
    }
    try { 
      const raw = localStorage.getItem(`${DB_VERSION}_${key}`);
      if (raw === null) return def;
      const res = JSON.parse(raw);
      if (key === 'products' && Array.isArray(res) && res.length > 0) {
        const filtered = res.filter(p => !isTestOrJunkProduct(p));
        window._ZENVY_PRODUCTS_CACHE = filtered;
        return filtered;
      }
      return res !== null && res !== undefined ? res : def;
    }
    catch { return def; }
  },
  getObj(key, def = {}) {
    try { return JSON.parse(localStorage.getItem(`${DB_VERSION}_${key}`) || JSON.stringify(def)); }
    catch { return def; }
  },
  set(key, value) {
    const now = Date.now();
    if (key === 'products' && Array.isArray(value)) {
      window._ZENVY_PRODUCTS_CACHE = value;
    }
    try {
      localStorage.setItem(`${DB_VERSION}_${key}`, JSON.stringify(value));
      localStorage.setItem(`${DB_VERSION}_${key}_updatedAt`, now.toString());
    } catch(err) {
      console.warn(`[Store] Failed to write key "${key}":`, err);
      if (key === 'products' && Array.isArray(value)) {
        try {
          const slimmed = value.map(p => {
            const cp = { ...p };
            if (cp.sizeChartImage && cp.sizeChartImage.length > 400000) cp.sizeChartImage = '';
            if (cp.imageUrl && cp.image && cp.imageUrl === cp.image) cp.imageUrl = '';
            return cp;
          });
          localStorage.setItem(`${DB_VERSION}_${key}`, JSON.stringify(slimmed));
          localStorage.setItem(`${DB_VERSION}_${key}_updatedAt`, now.toString());
        } catch(e2){}
      }
    }
    // Mirror write to Firestore for cross-origin sync
    if (window.ZenvyFirebase && typeof window.ZenvyFirebase.push === 'function') {
      window.ZenvyFirebase.push(key, value);
    }
    // Broadcast locally for instant reactivity across open views and tabs
    try {
      window.dispatchEvent(new StorageEvent('storage', { key: `${DB_VERSION}_${key}`, newValue: JSON.stringify(value) }));
      window.dispatchEvent(new CustomEvent('zenvy-store-updated', { detail: { key, value, updatedAt: now } }));
    } catch(e) {}
  },
  setObj(key, value) {
    const now = Date.now();
    try {
      localStorage.setItem(`${DB_VERSION}_${key}`, JSON.stringify(value));
      localStorage.setItem(`${DB_VERSION}_${key}_updatedAt`, now.toString());
    } catch(err) {
      console.warn(`[Store] Failed to write obj "${key}":`, err);
    }
    // Mirror write to Firestore for cross-origin sync
    if (window.ZenvyFirebase && typeof window.ZenvyFirebase.push === 'function') {
      window.ZenvyFirebase.push(key, value);
    }
    // Broadcast locally for instant reactivity across open views and tabs
    try {
      window.dispatchEvent(new StorageEvent('storage', { key: `${DB_VERSION}_${key}`, newValue: JSON.stringify(value) }));
      window.dispatchEvent(new CustomEvent('zenvy-store-updated', { detail: { key, value, updatedAt: now } }));
    } catch(e) {}
  },
  genId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
  },
  now() { return new Date().toISOString(); }
};


// ──────────────────────────────────────────────────────────
// Schema & Initial Seed Data Management
// ──────────────────────────────────────────────────────────
const SEED_VERSION = 11; // v11: Protect user products from auto-deletion, remove demo products
let _isSeeding = false;
function seedDefaultData() {
  if (_isSeeding) return;
  _isSeeding = true;
  try {
    // Only set default empty lists if key does NOT exist at all (null/undefined)
    if (Store.get('orders') === null) Store.set('orders', []);
    if (Store.get('customers') === null) Store.set('customers', []);
    if (Store.get('returns') === null) Store.set('returns', []);
    if (Store.get('refunds') === null) Store.set('refunds', []);
    if (Store.get('activityLog') === null) Store.set('activityLog', []);
    if (Store.get('notifLog') === null) Store.set('notifLog', []);
    if (Store.get('inventoryHistory') === null) Store.set('inventoryHistory', []);
    if (Store.get('priceHistory') === null) Store.set('priceHistory', []);
    if (Store.get('products') === null) Store.set('products', []);
    if (Store.get('categories') === null || !Array.isArray(Store.get('categories')) || Store.get('categories').length === 0) {
      Store.set('categories', DB.categories.defaultItems);
    }
    if (Store.get('collections') === null || !Array.isArray(Store.get('collections')) || Store.get('collections').length === 0) {
      Store.set('collections', DB.collections.defaultItems);
    }
    if (Store.get('banners') === null || !Array.isArray(Store.get('banners')) || Store.get('banners').length === 0) {
      Store.set('banners', DB.banners.defaultItems);
    }

    Store.setObj('seeded', true);
    Store.setObj('seeded_version', SEED_VERSION);


  // Brand Settings
  DB.brand.save({
    brandName: 'ZENVY', logoUrl: '', faviconUrl: '',
    tagline: 'The New Era of Performance',
    description: 'Elevating performance wear through editorial design and technical precision.',
    phone: '+880 1700-000000', email: 'support@zenvy.com',
    address: 'Dhaka, Bangladesh',
    socialFacebook: 'https://facebook.com/zenvy', 
    socialInstagram: 'https://instagram.com/zenvy',
    socialTwitter: 'https://twitter.com/zenvy',
    socialTikTok: 'https://tiktok.com/@zenvy', 
    socialYoutube: 'https://youtube.com/@zenvy',
    currency: 'BDT', currencySymbol: '৳',
    returnPolicy: '7-day hassle-free returns.',
    privacyPolicy: 'We respect your privacy.',
    termsAndConditions: 'Standard terms apply.',
  });

  // Sizes
  ['XS','S','M','L','XL','XXL','3XL','4XL'].forEach((code, i) => {
    DB.sizes.create({ code, name: code, displayOrder: i, isEnabled: true });
  });

  // Colors
  [
    { name: 'Black', hexCode: '#000000' },
    { name: 'White', hexCode: '#FFFFFF' },
    { name: 'Red', hexCode: '#DC2626' },
    { name: 'Navy', hexCode: '#1e3a5f' },
    { name: 'Royal Blue', hexCode: '#1D4ED8' },
    { name: 'Green', hexCode: '#16A34A' },
  ].forEach(c => DB.colors.create({ ...c, isEnabled: true }));

  // Sleeves
  [
    { name: 'Half Sleeve', additionalPrice: 0, description: 'Standard half sleeve', displayOrder: 0 },
    { name: 'Full Sleeve', additionalPrice: 100, description: 'Full sleeve (+৳100)', displayOrder: 1 },
    { name: 'Sleeveless', additionalPrice: 0, description: 'No sleeves', displayOrder: 2 },
  ].forEach(s => DB.sleeves.create({ ...s, isEnabled: true }));

  // Patches
  [
    { name: 'UEFA Champions League', price: 250, description: 'Official UCL sleeve patch', displayOrder: 0 },
    { name: 'Premier League', price: 200, description: 'EPL sleeve patch', displayOrder: 1 },
    { name: 'La Liga', price: 200, description: 'La Liga sleeve patch', displayOrder: 2 },
  ].forEach(p => DB.patches.create({ ...p, imageUrl: '', isEnabled: true }));

  // Customization Settings
  DB.customizationSettings.save({
    namePrinting: { enabled: true, price: 200, maxChars: 12, minChars: 1, font: 'Block', style: 'Standard' },
    numberPrinting: { enabled: true, price: 150, maxDigits: 2 },
    nameNumberPackage: { enabled: true, price: 300 },
    customLogo: { enabled: false, price: 500, allowedTypes: 'image/png,image/svg+xml', maxSizeMB: 2 },
  });

  // Shipping Methods
  [
    { name: 'Inside Dhaka', area: 'Dhaka', deliveryTime: '1-2 days', price: 80, minOrder: 0, freeThreshold: 3000, isEnabled: true },
    { name: 'Outside Dhaka', area: 'Nationwide', deliveryTime: '3-5 days', price: 130, minOrder: 0, freeThreshold: 5000, isEnabled: true },
    { name: 'Express', area: 'Dhaka', deliveryTime: 'Same Day', price: 200, minOrder: 0, freeThreshold: 0, isEnabled: true },
  ].forEach(s => DB.shipping.create(s));

  // Payment Methods
  DB.payments.save({
    methods: [
      { id: 'cod', name: 'Cash on Delivery', enabled: true, icon: 'payments' },
      { id: 'bkash', name: 'bKash', enabled: true, icon: 'smartphone', number: '' },
      { id: 'nagad', name: 'Nagad', enabled: false, icon: 'smartphone', number: '' },
      { id: 'card', name: 'Credit/Debit Card', enabled: false, icon: 'credit_card' },
    ]
  });

  // Store Policy Settings
  DB.storeSettings.save({
    cashOnDelivery: true,
    requirePayFirst: false,
    deliveryChargeEnabled: true,
    deliveryChargeFreeThreshold: 3000,
    minOrderAmount: 0,
    codNote: 'Pay when your order arrives at your door.',
    payFirstNote: 'Advance payment via bKash or Nagad required to confirm your order.',
  });

  // Seed active catalog on first launch if empty
  if (!Store.get('products') || Store.get('products').length === 0) {
    Store.set('products', JSON.parse(JSON.stringify(ACTIVE_CATALOG_BASELINE)));
    window._ZENVY_PRODUCTS_CACHE = JSON.parse(JSON.stringify(ACTIVE_CATALOG_BASELINE));
  }
  // Homepage Config
  DB.homepage.save({
    announcement: { enabled: true, marqueeText: 'THE NEW SEASON • SHOP OFFICIAL JERSEYS • FREE EXPRESS SHIPPING OVER ৳1500 • INTERACTIVE 3D CUSTOM STUDIO LIVE • PRO-GRADE AEROKNIT WEAVE TECHNOLOGY', badgeText: 'SS/26 DROPS LIVE' },
    hero: { 
      enabled: true, 
      badge: 'NEW ARRIVAL • MATCH EDITION', 
      title: 'ENGINEERED FOR SUPREMACY', 
      subtitle: 'The new standard in high-performance kits. Ethereal technical design crafted for pro athletes.', 
      ctaPrimaryText: 'SHOP', 
      ctaPrimaryLink: 'index.html#shop', 
      ctaSecondaryText: 'PRE-ORDERS', 
      ctaSecondaryLink: 'preorders.html', 
      bgImage: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1920&q=80' 
    },
    valueProps: [
      { id: 'prop1', icon: 'local_shipping', title: 'Express Shipping', subtitle: '2-4 Business Days Worldwide' },
      { id: 'prop2', icon: 'verified', title: 'Authentic Grade', subtitle: '100% Pro-Athlete Specification' },
      { id: 'prop3', icon: 'workspace_premium', title: 'Official Kit Badges', subtitle: 'Tournament Patches & Name Printing' },
      { id: 'prop4', icon: 'autorenew', title: '30-Day Guarantee', subtitle: 'Hassle-Free Returns & Exchanges' }
    ],
    collections: {
      title: 'Featured Collections',
      subtitle: 'EXPLORE BY CATEGORY',
      cards: [
        { id: 'col1', tag: 'COLLECTION SS/26', title: 'CLUB MATCH KITS', desc: 'Official tournament jerseys engineered with micro-perforated Aeroknit weave.', link: 'product.html?id=prod_mwafxrols41103ror', bgImage: 'img/products/prod_mwafxrols41103ror.jpg' },
        { id: 'col2', tag: 'LIMITED DROP', title: 'INTERNATIONAL EDITIONS', desc: 'National team tournament kits with authentic gold badges and match typography.', link: 'product.html?id=prod_mw9setzepymsatr9c', bgImage: 'img/products/prod_mw9setzepymsatr9c.jpg' },
        { id: 'col3', tag: 'PRO TRAINING', title: 'PRECISION OUTERWEAR', desc: 'Technical windbreakers, compression layers and pace shorts built for all climates.', link: 'product.html?id=prod_mw9ru5dmlxx3y3v5l', bgImage: 'img/products/prod_mw9ru5dmlxx3y3v5l.jpg' }
      ]
    },
    justDropped: { badge: 'NEW ARRIVALS', title: 'JUST DROPPED', subtitle: 'The latest high-performance releases from ZENVY Studio.' },
    shopBanner: {
      enabled: true,
      slides: [
        {
          id: 'slide1',
          tag: 'ZENVY COLLECTION',
          title: 'LIMITED\nEDITION KITS',
          subtitle: 'Elevate Your Game • Exclusively Online',
          bgImage: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=1200&q=80'
        },
        {
          id: 'slide2',
          tag: 'NEW ARRIVAL',
          title: 'ELITE\nFOOTBALL KITS',
          subtitle: 'The New Season Is Here',
          bgImage: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&q=80'
        }
      ]
    },
    sections: [
      { id: 'new_arrivals', title: 'Just Dropped', subtitle: 'The latest additions', enabled: true, order: 0, productIds: [] },
      { id: 'best_sellers', title: 'Best Sellers', subtitle: '', enabled: true, order: 1, productIds: [] },
      { id: 'featured', title: 'Featured Collection', subtitle: '', enabled: true, order: 2, productIds: [] },
      { id: 'preorders', title: 'Pre-Orders', subtitle: 'Reserve yours now', enabled: true, order: 3, productIds: [] },
    ]
  });

  // Notification Templates
  DB.notifications.save({
    orderPlaced: { enabled: true, template: 'Your ZENVY order #{orderNumber} has been placed! We\'ll confirm it shortly.' },
    orderConfirmed: { enabled: true, template: 'Order #{orderNumber} confirmed! We\'re preparing your gear.' },
    orderShipped: { enabled: true, template: 'Your ZENVY order #{orderNumber} has been shipped! Tracking: {tracking}' },
    orderDelivered: { enabled: true, template: 'Order #{orderNumber} delivered! Enjoy your ZENVY gear.' },
    preorderConfirmed: { enabled: true, template: 'Preorder #{orderNumber} confirmed! Expected delivery: {date}' },
    returnApproved: { enabled: true, template: 'Your return for order #{orderNumber} has been approved.' },
    refundCompleted: { enabled: true, template: 'Your refund of ৳{amount} for order #{orderNumber} has been processed.' },
  });

  // Seed Sample Orders (client handover: keep 100% clean with 0 orders and ৳0 revenue)
  const DEFAULT_SEED_ORDERS = [];

  Store.setObj('seeded', true);
  Store.setObj('seeded_version', SEED_VERSION);
  } finally {
    _isSeeding = false;
  }
}


// ──────────────────────────────────────────────────────────
// Database API
// ──────────────────────────────────────────────────────────
const DB = {

  // ── Database Maintenance ──
  resetDatabase() {
    try { localStorage.clear(); } catch(e){}
    Store.setObj('seeded_version', 0);
    seedDefaultData();
    if (typeof window !== 'undefined') window.location.reload();
  },

  // ── Client Handover & Data Purge (Clears orders, customers, and revenue) ──
  clearAllTransactions() {
    const keys = ['orders', 'customers', 'returns', 'refunds', 'activityLog', 'notifLog', 'inventoryHistory', 'priceHistory'];
    keys.forEach(k => {
      Store.set(k, []);
      if (window.ZenvyFirebase && typeof window.ZenvyFirebase.push === 'function') {
        window.ZenvyFirebase.push(k, []);
      }
    });
    DB.log('Store transactions, orders, customers & revenue reset to 0 for fresh client launch');
    return true;
  },

  // ── Brand Settings (singleton) ──
  brand: {
    get() { return Store.getObj('brand', { currency: 'BDT', currencySymbol: '৳', usdRate: 120 }); },
    save(data) { Store.setObj('brand', { ...Store.getObj('brand', {}), ...data, updatedAt: Store.now() }); DB.log('Brand settings updated'); return DB.brand.get(); }
  },

  // ── Currency Helpers ──
  currency: {
    get() {
      const brand = DB.brand.get();
      const code = brand.currency || 'BDT';
      const symbol = brand.currencySymbol || (code === 'USD' ? '$' : '৳');
      const rate = parseFloat(brand.usdRate) || 120;
      return { code, symbol, rate };
    },
    set(code, symbol, rate) {
      const sym = symbol || (code === 'USD' ? '$' : '৳');
      DB.brand.save({ currency: code, currencySymbol: sym, usdRate: rate || 120 });
      DB.log(`Currency updated to ${code} (${sym})`);
    },
    format(amountInBDT) {
      const cur = DB.currency.get();
      const num = parseFloat(amountInBDT) || 0;
      if (cur.code === 'USD') {
        const usdVal = num / cur.rate;
        return `${cur.symbol}${usdVal.toFixed(2)}`;
      }
      return `${cur.symbol}${Math.round(num).toLocaleString()}`;
    },
    symbol() {
      return DB.currency.get().symbol;
    },
    code() {
      return DB.currency.get().code;
    }
  },

  // ── Categories ──
  categories: {
    defaultItems: [
      {
        id: 'cat_club_match_kits',
        name: 'Club Match Kits',
        slug: 'club-match-kits',
        description: 'Official tournament jerseys engineered with micro-perforated Aeroknit weave.',
        imageUrl: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=1200&q=80',
        displayOrder: 1,
        isActive: true,
        badge: 'TOP CHOICE'
      },
      {
        id: 'cat_national_teams',
        name: 'National Teams',
        slug: 'national-teams',
        description: 'National team tournament kits with authentic gold badges and match typography.',
        imageUrl: 'https://images.unsplash.com/photo-1511886929837-354d827aae26?w=1200&q=80',
        displayOrder: 2,
        isActive: true,
        badge: 'LIMITED DROP'
      },
      {
        id: 'cat_mens_football',
        name: "Men's Football",
        slug: 'mens-football',
        description: 'Authentic breathable match jerseys with AeroKnit technology.',
        imageUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=1200&q=80',
        displayOrder: 3,
        isActive: true,
        badge: 'POPULAR'
      },
      {
        id: 'cat_training_gear',
        name: 'Training Gear',
        slug: 'training-gear',
        description: 'Technical windbreakers, compression layers, bibs and workout shorts.',
        imageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=1200&q=80',
        displayOrder: 4,
        isActive: true,
        badge: 'PRO TRAINING'
      },
      {
        id: 'cat_outerwear',
        name: 'Outerwear',
        slug: 'outerwear',
        description: 'Technical weather-resistant jackets and performance track tops.',
        imageUrl: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=1200&q=80',
        displayOrder: 5,
        isActive: true,
        badge: 'NEW DROP'
      },
      {
        id: 'cat_kids_collection',
        name: 'Kids Collection',
        slug: 'kids-collection',
        description: 'Junior sizing and youth football academy kits built for young athletes.',
        imageUrl: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=1200&q=80',
        displayOrder: 6,
        isActive: true,
        badge: 'ACADEMY'
      }
    ],
    all() {
      const raw = localStorage.getItem(`${DB_VERSION}_categories`);
      let items = [];
      if (raw === null) {
        items = JSON.parse(JSON.stringify(this.defaultItems));
        Store.set('categories', items);
      } else {
        try { items = JSON.parse(raw) || []; } catch(e){ items = []; }
      }

      const delKey = `${DB_VERSION}_deleted_category_ids`;
      let deletedIds = new Set();
      try {
        const delRaw = localStorage.getItem(delKey);
        if (delRaw) deletedIds = new Set(JSON.parse(delRaw));
      } catch(e){}

      return (items || [])
        .filter(c => {
          if (!c) return false;
          const cid = String(c.id || '').trim().toLowerCase();
          const cslug = String(c.slug || '').trim().toLowerCase();
          return !deletedIds.has(cid) && !deletedIds.has(cslug);
        })
        .sort((a,b) => (parseInt(a.displayOrder) || 0) - (parseInt(b.displayOrder) || 0));
    },
    byId(id) {
      if (!id) return null;
      const strId = String(id).trim().toLowerCase();
      return (this.all() || []).find(c => String(c.id).trim().toLowerCase() === strId || String(c.slug||'').trim().toLowerCase() === strId || String(c.name||'').trim().toLowerCase() === strId) || null;
    },
    active() {
      return (this.all() || []).filter(c => c.isActive !== false);
    },
    create(data) {
      const items = (this.all() || []).slice();
      const item = { id: 'cat_' + Store.genId(), ...data, createdAt: Store.now(), updatedAt: Store.now() };
      items.push(item);

      // Clean from deleted tracking if re-added
      const delKey = `${DB_VERSION}_deleted_category_ids`;
      try {
        const raw = localStorage.getItem(delKey);
        if (raw) {
          let delIds = JSON.parse(raw);
          if (Array.isArray(delIds)) {
            const strSlug = String(item.slug || '').trim().toLowerCase();
            const strId = String(item.id || '').trim().toLowerCase();
            delIds = delIds.filter(x => x !== strSlug && x !== strId);
            localStorage.setItem(delKey, JSON.stringify(delIds));
          }
        }
      } catch(e){}

      Store.set('categories', items);
      DB.log(`Category created: ${item.name}`);
      return item;
    },
    update(id, data) {
      const strId = String(id).trim().toLowerCase();
      const items = (this.all() || []).map(c => (String(c.id).trim().toLowerCase() === strId || String(c.slug||'').trim().toLowerCase() === strId || String(c.name||'').trim().toLowerCase() === strId) ? { ...c, ...data, updatedAt: Store.now() } : c);

      // Clean from deleted tracking if updated
      const delKey = `${DB_VERSION}_deleted_category_ids`;
      try {
        const raw = localStorage.getItem(delKey);
        if (raw) {
          let delIds = JSON.parse(raw);
          if (Array.isArray(delIds)) {
            const strSlug = String(data.slug || '').trim().toLowerCase();
            delIds = delIds.filter(x => x !== strSlug && x !== strId);
            localStorage.setItem(delKey, JSON.stringify(delIds));
          }
        }
      } catch(e){}

      Store.set('categories', items);
      DB.log(`Category updated: ${data.name || id}`);
      return items.find(c => String(c.id).trim().toLowerCase() === strId || String(c.slug||'').trim().toLowerCase() === strId || String(data.slug||'').trim().toLowerCase() === String(c.slug||'').trim().toLowerCase());
    },
    delete(id) {
      const strId = String(id).trim().toLowerCase();
      const cat = this.byId(id);
      const items = (this.all() || []).filter(c => String(c.id).trim().toLowerCase() !== strId && String(c.slug||'').trim().toLowerCase() !== strId && String(c.name||'').trim().toLowerCase() !== strId);
      Store.set('categories', items);

      // 1. Immediately record in local deleted category registry
      const delKey = `${DB_VERSION}_deleted_category_ids`;
      try {
        let delIds = [];
        const raw = localStorage.getItem(delKey);
        if (raw) delIds = JSON.parse(raw);
        if (!delIds.includes(strId)) delIds.push(strId);
        if (cat && cat.slug && !delIds.includes(String(cat.slug).trim().toLowerCase())) delIds.push(String(cat.slug).trim().toLowerCase());
        localStorage.setItem(delKey, JSON.stringify(delIds));
      } catch(e){}

      // 2. Track in cloud Firestore
      if (window.ZenvyFirebase && typeof window.ZenvyFirebase.deleteCategory === 'function') {
        window.ZenvyFirebase.deleteCategory(id);
        if (cat && cat.slug) window.ZenvyFirebase.deleteCategory(cat.slug);
      }

      try {
        const prods = Store.get('products') || [];
        let updatedProds = false;
        prods.forEach(p => {
          if (String(p.categoryId).trim().toLowerCase() === strId || (cat && String(p.categoryName || '').toLowerCase() === String(cat.name || '').toLowerCase())) {
            p.categoryId = null;
            p.categoryName = 'Standard Collection';
            updatedProds = true;
          }
        });
        if (updatedProds) Store.set('products', prods);
      } catch(e){}
      DB.log(`Category deleted: ${cat?.name || id}`);
      return items;
    },
    toggle(id, field) {
      const cat = this.byId(id);
      if (cat) this.update(id, { [field]: !cat[field] });
    }
  },

  // ── Subcategories ──
  subcategories: {
    all() { return Store.get('subcategories') || []; },
    byCategory(catId) { return (this.all() || []).filter(s => s.categoryId === catId); },
    byId(id) { return (this.all() || []).find(s => s.id === id); },
    create(data) {
      const items = this.all() || [];
      const item = { id: Store.genId(), ...data, createdAt: Store.now() };
      items.push(item); Store.set('subcategories', items);
      DB.log(`Subcategory created: ${item.name}`); return item;
    },
    update(id, data) {
      const items = (this.all() || []).map(s => s.id === id ? { ...s, ...data } : s);
      Store.set('subcategories', items); return items.find(s => s.id === id);
    },
    delete(id) { Store.set('subcategories', (this.all() || []).filter(s => s.id !== id)); }
  },

  // ── Collections ──
  collections: {
    defaultItems: [
      {
        id: 'col1',
        name: 'Club Match Kits',
        slug: 'club-match-kits',
        description: 'Official tournament jerseys engineered with micro-perforated Aeroknit weave.',
        imageUrl: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=1200&q=80',
        badge: 'COLLECTION SS/26',
        isActive: true
      },
      {
        id: 'col2',
        name: 'International Editions',
        slug: 'national-teams',
        description: 'National team tournament kits with authentic gold badges and match typography.',
        imageUrl: 'https://images.unsplash.com/photo-1511886929837-354d827aae26?w=1200&q=80',
        badge: 'LIMITED DROP',
        isActive: true
      },
      {
        id: 'col3',
        name: 'Precision Outerwear',
        slug: 'outerwear',
        description: 'Technical windbreakers, compression layers and pace shorts built for all climates.',
        imageUrl: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=1200&q=80',
        badge: 'PRO TRAINING',
        isActive: true
      }
    ],
    all() {
      let items = Store.get('collections');
      if (items === null || !Array.isArray(items)) {
        items = JSON.parse(JSON.stringify(this.defaultItems));
        Store.set('collections', items);
      }
      return items || [];
    },
    active() { return (this.all() || []).filter(c => c.isActive !== false); },
    byId(id) { return (this.all() || []).find(c => c.id === id); },
    create(data) {
      const items = this.all() || [];
      const item = { id: Store.genId(), ...data, createdAt: Store.now(), updatedAt: Store.now() };
      items.push(item); Store.set('collections', items);
      DB.log(`Collection created: ${item.name}`); return item;
    },
    update(id, data) {
      const items = (this.all() || []).map(c => c.id === id ? { ...c, ...data, updatedAt: Store.now() } : c);
      Store.set('collections', items); DB.log(`Collection updated: ${data.name||id}`);
      return items.find(c => c.id === id);
    },
    delete(id) {
      const col = this.byId(id);
      const items = (this.all() || []).filter(c => c.id !== id);
      Store.set('collections', items);
      DB.log(`Collection deleted: ${col?.name}`);
      return items;
    }
  },

  // ── Products ──
  products: {
    all() {
      if (Array.isArray(window._ZENVY_PRODUCTS_CACHE) && window._ZENVY_PRODUCTS_CACHE.length > 0) {
        const filtered = window._ZENVY_PRODUCTS_CACHE.filter(p => !isTestOrJunkProduct(p));
        if (filtered.length > 0) {
          return filtered.sort((a, b) => {
            const tA = (a.createdAt ? new Date(a.createdAt).getTime() : 0) || (a.updatedAt ? new Date(a.updatedAt).getTime() : 0) || 0;
            const tB = (b.createdAt ? new Date(b.createdAt).getTime() : 0) || (b.updatedAt ? new Date(b.updatedAt).getTime() : 0) || 0;
            return tB - tA;
          });
        }
      }
      let items = Store.get('products');
      if (Array.isArray(items) && items.length > 0) {
        const filtered = items.filter(p => !isTestOrJunkProduct(p));
        if (filtered.length > 0) {
          filtered.sort((a, b) => {
            const tA = (a.createdAt ? new Date(a.createdAt).getTime() : 0) || (a.updatedAt ? new Date(a.updatedAt).getTime() : 0) || 0;
            const tB = (b.createdAt ? new Date(b.createdAt).getTime() : 0) || (b.updatedAt ? new Date(b.updatedAt).getTime() : 0) || 0;
            return tB - tA;
          });
          window._ZENVY_PRODUCTS_CACHE = filtered;
          return filtered;
        }
      }
      // Instant fallback to baseline active catalog for fresh devices & cold starts (0ms load)
      if (typeof ACTIVE_CATALOG_BASELINE !== 'undefined' && Array.isArray(ACTIVE_CATALOG_BASELINE) && ACTIVE_CATALOG_BASELINE.length > 0) {
        const baselineCopy = JSON.parse(JSON.stringify(ACTIVE_CATALOG_BASELINE));
        baselineCopy.sort((a, b) => {
          const tA = (a.createdAt ? new Date(a.createdAt).getTime() : 0) || (a.updatedAt ? new Date(a.updatedAt).getTime() : 0) || 0;
          const tB = (b.createdAt ? new Date(b.createdAt).getTime() : 0) || (b.updatedAt ? new Date(b.updatedAt).getTime() : 0) || 0;
          return tB - tA;
        });
        window._ZENVY_PRODUCTS_CACHE = baselineCopy;
        return baselineCopy;
      }
      return [];
    },
    byId(id) {
      if (!id) return null;
      const strId = String(id).trim().toLowerCase();
      const all = DB.products.all();
      // 1. Strict ID match first (highest priority)
      let p = all.find(x => String(x.id || '').trim().toLowerCase() === strId);
      // 2. Slug match only as secondary fallback
      if (!p) {
        p = all.find(x => String(x.slug || '').trim().toLowerCase() === strId);
      }
      return p || null;
    },
    published() {
      return DB.products.all()
        .filter(p => (p.isPublished !== false && p.status !== 'draft') && !p.isArchived)
        .sort((a, b) => {
          const tA = (a.createdAt ? new Date(a.createdAt).getTime() : 0) || (a.updatedAt ? new Date(a.updatedAt).getTime() : 0) || 0;
          const tB = (b.createdAt ? new Date(b.createdAt).getTime() : 0) || (b.updatedAt ? new Date(b.updatedAt).getTime() : 0) || 0;
          return tB - tA; // Newest products at the top!
        });
    },
    list() { return this.published(); },
    lowStock() { return DB.products.all().filter(p => p.stock <= (p.lowStockAlert||5) && p.stock > 0 && !p.isArchived); },
    outOfStock() { return DB.products.all().filter(p => p.stock === 0 && !p.isArchived); },
    preorders() { return DB.products.all().filter(p => p.isPreorder && !p.isArchived); },
    search(q) {
      const lq = q.toLowerCase();
      return DB.products.all().filter(p =>
        p.name?.toLowerCase().includes(lq) || p.sku?.toLowerCase().includes(lq) ||
        p.categoryName?.toLowerCase().includes(lq)
      );
    },
    getImage(p) {
      const fallback = 'img/products/prod_mwafvhg25iobn348j.jpg';
      if (!p) return fallback;
      if (typeof p.image === 'string' && p.image.trim() && !p.image.includes('aida-public')) return p.image.trim();
      if (typeof p.imageUrl === 'string' && p.imageUrl.trim() && !p.imageUrl.includes('aida-public')) return p.imageUrl.trim();
      if (Array.isArray(p.images) && p.images.length > 0) {
        const prim = p.images.find(x => x && typeof x === 'object' && x.isPrimary && (x.url || x.dataUrl || x.src));
        if (prim) {
          const u = prim.url || prim.dataUrl || prim.src;
          if (typeof u === 'string' && u.trim() && !u.includes('aida-public')) return u.trim();
        }
        for (let i = 0; i < p.images.length; i++) {
          const item = p.images[i];
          if (typeof item === 'string' && item.trim() && !item.includes('aida-public')) return item.trim();
          if (item && typeof item === 'object') {
            const u = item.url || item.dataUrl || item.src;
            if (typeof u === 'string' && u.trim() && !u.includes('aida-public')) return u.trim();
          }
        }
      }
      return fallback;
    },
    create(data) {
      const items = Store.get('products') || [];
      const isPub = data.isPublished !== undefined ? Boolean(data.isPublished) : (data.status === 'draft' ? false : true);
      const isPre = data.isPreorder !== undefined ? Boolean(data.isPreorder) : false;
      const newId = (data.id && String(data.id).trim()) || ('prod_' + Store.genId());
      const item = {
        ...data,
        id: newId,
        isPreorder: isPre,
        isPublished: isPub,
        status: isPub ? 'published' : 'draft',
        isArchived: false,
        createdAt: data.createdAt || Store.now(),
        updatedAt: Store.now()
      };
      if (Array.isArray(item.images) && item.images.length > 0 && !item.image) {
        const f = item.images[0];
        item.image = (f && typeof f === 'object' && f.url) ? f.url : (typeof f === 'string' ? f : '');
      }
      if (item.image && !item.imageUrl) {
        item.imageUrl = item.image;
      }
      const existingIdx = items.findIndex(x => String(x.id).trim().toLowerCase() === String(newId).trim().toLowerCase());
      if (existingIdx >= 0) {
        items[existingIdx] = item;
      } else {
        items.unshift(item); // Latest product placed at the top of the catalog
      }
      Store.set('products', items);
      if (window.ZenvyFirebase && typeof window.ZenvyFirebase.saveProduct === 'function') {
        window.ZenvyFirebase.saveProduct(item);
      }
      DB.log(`Product created: ${item.name}`);
      if (DB.inventory && typeof DB.inventory.addHistory === 'function') {
        DB.inventory.addHistory({ productId: item.id, productName: item.name, change: item.stock || 0, newStock: item.stock || 0, reason: 'Initial stock', admin: 'Admin' });
      }
      return item;
    },
    update(id, data) {
      if (!id) return null;
      const strId = String(id).trim().toLowerCase();
      const old = DB.products.byId(id);
      const createdAt = data.createdAt || old?.createdAt || Store.now();
      const updates = { ...data, createdAt, updatedAt: Store.now() };
      if (updates.isPreorder !== undefined) {
        updates.isPreorder = Boolean(updates.isPreorder);
      }
      if (updates.isPublished !== undefined && updates.status === undefined) {
        updates.status = updates.isPublished ? 'published' : 'draft';
      } else if (updates.status !== undefined && updates.isPublished === undefined) {
        updates.isPublished = updates.status !== 'draft';
      }
      if (Array.isArray(updates.images) && updates.images.length > 0 && !updates.image) {
        const f = updates.images[0];
        updates.image = (f && typeof f === 'object' && f.url) ? f.url : (typeof f === 'string' ? f : '');
      }
      if (updates.image && !updates.imageUrl) {
        updates.imageUrl = updates.image;
      }

      let updatedItem = null;
      const items = (Store.get('products') || []).map(p => {
        const pId = String(p.id || '').trim().toLowerCase();
        // STRICT ID MATCH ONLY: Never match by slug to prevent corrupting or overwriting other products!
        if (pId === strId) {
          updatedItem = { ...p, ...updates, id: p.id };
          return updatedItem;
        }
        return p;
      });

      if (!updatedItem) {
        updatedItem = { ...(old || {}), ...updates, id: (old?.id || id) };
        items.unshift(updatedItem);
      }

      Store.set('products', items);
      const resItem = updatedItem;
      // Direct in-memory cache update for 0ms latency
      if (Array.isArray(window._ZENVY_PRODUCTS_CACHE)) {
        const cIdx = window._ZENVY_PRODUCTS_CACHE.findIndex(x => String(x.id).trim().toLowerCase() === strId);
        if (cIdx >= 0) window._ZENVY_PRODUCTS_CACHE[cIdx] = resItem;
        else window._ZENVY_PRODUCTS_CACHE.unshift(resItem);
      }
      if (resItem && window.ZenvyFirebase && typeof window.ZenvyFirebase.saveProduct === 'function') {
        window.ZenvyFirebase.saveProduct(resItem);
      }
      if (data.basePrice !== undefined && old?.basePrice !== data.basePrice && DB.priceHistory && typeof DB.priceHistory.add === 'function') {
        DB.priceHistory.add({ productId: id, productName: old?.name, oldPrice: old?.basePrice, newPrice: data.basePrice, type: 'basePrice' });
      }
      DB.log(`Product updated: ${data.name || old?.name}`);
      return resItem;
    },
    duplicate(id) {
      const src = DB.products.byId(id);
      if (!src) return null;
      const copy = JSON.parse(JSON.stringify(src));
      const newId = 'prod_' + Store.genId();
      copy.id = newId;
      copy.name = src.name.replace(/\s*\(Copy(\s*\d+)?\)$/i, '') + ' (Copy)';
      copy.sku = (src.sku ? String(src.sku).replace(/-COPY-[\w\d]+$/i, '') : 'ZNV') + '-COPY-' + Date.now().toString(36).toUpperCase();
      copy.slug = (src.slug ? String(src.slug).replace(/-copy-[\w\d]+$/i, '') : (src.name || 'product').toLowerCase().replace(/[^a-z0-9]+/g, '-')) + '-copy-' + Date.now().toString(36);
      copy.isPublished = true;
      copy.status = 'published';
      copy.stock = (typeof src.stock === 'number' && src.stock > 0) ? src.stock : 10;
      copy.sizeStocks = (src.sizeStocks && typeof src.sizeStocks === 'object') ? JSON.parse(JSON.stringify(src.sizeStocks)) : null;
      copy.isArchived = false;
      copy.isPreorder = Boolean(src.isPreorder);
      copy.createdAt = Store.now();
      copy.updatedAt = Store.now();

      const created = DB.products.create(copy);
      if (created && DB.variants && typeof DB.variants.byProduct === 'function') {
        const vars = DB.variants.byProduct(id);
        if (Array.isArray(vars) && vars.length > 0) {
          vars.forEach(v => {
            const vCopy = JSON.parse(JSON.stringify(v));
            delete vCopy.id;
            vCopy.productId = created.id;
            vCopy.sku = `${created.id}-${v.size || 'M'}-${(v.color || 'S').substr(0, 3).toUpperCase()}`;
            DB.variants.create(vCopy);
          });
        }
      }
      return created;
    },
    archive(id) {
      const p = DB.products.byId(id);
      DB.products.update(id, { isArchived: true, isPublished: false });
      DB.log(`Product archived: ${p?.name}`);
    },
    delete(id) {
      if (!id) return 'deleted';
      const strId = String(id).trim();
      const lowerId = strId.toLowerCase();
      const p = DB.products.byId(strId);

      // 1. Instantly remove from in-memory cache
      if (Array.isArray(window._ZENVY_PRODUCTS_CACHE)) {
        window._ZENVY_PRODUCTS_CACHE = window._ZENVY_PRODUCTS_CACHE.filter(x => String(x.id).trim().toLowerCase() !== lowerId);
      }
      // 2. Instantly remove from localStorage products
      const all = Store.get('products') || [];
      const remaining = all.filter(x => String(x.id).trim().toLowerCase() !== lowerId);
      Store.set('products', remaining);

      // 3. Persist deleted ID in local tracking set so reload NEVER resurrects it
      try {
        const delKey = `${DB_VERSION}_deleted_product_ids`;
        let delSet = new Set();
        const rawDel = localStorage.getItem(delKey);
        if (rawDel) delSet = new Set(JSON.parse(rawDel));
        delSet.add(strId);
        delSet.add(lowerId);
        localStorage.setItem(delKey, JSON.stringify(Array.from(delSet)));
      } catch(e){}

      // 4. Delete from Firestore cloud
      if (window.ZenvyFirebase && typeof window.ZenvyFirebase.deleteProduct === 'function') {
        window.ZenvyFirebase.deleteProduct(strId);
      }
      DB.log(`Product deleted: ${p?.name || id}`);
      return 'deleted';
    },
    updateStock(id, qty, reason = 'Manual adjustment', sizeStocks = null) {
      const p = DB.products.byId(id);
      if (!p) return;
      const oldStock = p.stock;
      const updates = { stock: qty };
      if (sizeStocks && typeof sizeStocks === 'object') {
        updates.sizeStocks = sizeStocks;
      }
      DB.products.update(id, updates);
      DB.inventory.addHistory({ productId: id, productName: p.name, previousStock: oldStock, change: qty - oldStock, newStock: qty, reason });
    },
    exportCSV() {
      const prods = DB.products.all().filter(p => !p.isArchived);
      const rows = [['ID', 'Name', 'SKU', 'Category', 'Price', 'Compare At', 'Stock', 'Status', 'Badges', 'Created Date']];
      prods.forEach(p => {
        const badges = [];
        if (p.isNewArrival) badges.push('NEW');
        if (p.isBestSeller) badges.push('BEST');
        if (p.isFeatured) badges.push('FEAT');
        if (p.isPreorder) badges.push('PRE');
        if (p.isLimited) badges.push('LTD');
        rows.push([
          `"${String(p.id || '').replace(/"/g, '""')}"`,
          `"${String(p.name || '').replace(/"/g, '""')}"`,
          `"${String(p.sku || '').replace(/"/g, '""')}"`,
          `"${String(p.categoryName || p.category || '').replace(/"/g, '""')}"`,
          p.basePrice || p.price || 0,
          p.compareAt || p.compareAtPrice || '',
          p.stock || 0,
          p.isPublished ? 'PUBLISHED' : 'DRAFT',
          `"${badges.join(' ')}"`,
          `"${String(p.createdAt || '').replace(/"/g, '""')}"`
        ]);
      });
      return rows.map(r => r.join(',')).join('\n');
    }
  },

  // ── Product Variants ──
  variants: {
    byProduct(productId) { return Store.get('variants').filter(v => v.productId === productId); },
    byId(id) { return Store.get('variants').find(v => v.id === id); },
    create(data) {
      const items = Store.get('variants');
      const item = { id: Store.genId(), ...data, createdAt: Store.now() };
      items.push(item); Store.set('variants', items); return item;
    },
    update(id, data) {
      const items = Store.get('variants').map(v => v.id === id ? { ...v, ...data } : v);
      Store.set('variants', items); return items.find(v => v.id === id);
    },
    delete(id) { Store.set('variants', Store.get('variants').filter(v => v.id !== id)); },
    deleteByProduct(productId) { Store.set('variants', Store.get('variants').filter(v => v.productId !== productId)); }
  },

  // ── Sizes ──
  sizes: {
    all() {
      let raw = Store.get('sizes');
      const stdCodes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL', '4XL'];

      // Only seed initial default standard sizes once if sizes was never initialized
      if (raw === null || raw === undefined || (Array.isArray(raw) && raw.length === 0)) {
        raw = stdCodes.map((code, i) => ({
          id: 'sz_' + code.toLowerCase().replace(/[^a-z0-9]/g, ''),
          code,
          name: code,
          displayOrder: i,
          isEnabled: true,
          createdAt: Store.now()
        }));
        Store.set('sizes', raw);
        return raw;
      }
      if (!Array.isArray(raw)) return [];

      // STRICT DEDUPLICATION BY UPPERCASE CODE (Fixes L L, M M duplicates permanently)
      const seen = new Map();
      let hasDuplicates = false;

      raw.forEach((s, idx) => {
        if (!s) return;
        const code = String(s.code || s.name || '').toUpperCase().trim();
        if (!code) return;
        if (seen.has(code)) {
          hasDuplicates = true;
          // Prune duplicate: preserve enabled if any entry is enabled
          const existing = seen.get(code);
          if (s.isEnabled && !existing.isEnabled) existing.isEnabled = true;
          return;
        }
        const canonicalId = 'sz_' + code.toLowerCase().replace(/[^a-z0-9]/g, '');
        const stdIdx = stdCodes.indexOf(code);
        seen.set(code, {
          id: canonicalId,
          code,
          name: s.name || code,
          displayOrder: stdIdx >= 0 ? stdIdx : (typeof s.displayOrder === 'number' ? s.displayOrder : idx),
          isEnabled: s.isEnabled !== false,
          createdAt: s.createdAt || Store.now()
        });
      });

      const list = Array.from(seen.values()).sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));

      // Self-heal storage if duplicates or non-canonical IDs were detected
      if (hasDuplicates || list.length !== raw.length) {
        Store.set('sizes', list);
      }

      return list;
    },
    enabled() { 
      return DB.sizes.all().filter(s => s.isEnabled); 
    },
    byId(id) {
      if (!id) return null;
      const target = String(id).trim().toLowerCase();
      return DB.sizes.all().find(s => 
        String(s.id).trim().toLowerCase() === target || 
        String(s.code).trim().toLowerCase() === target
      );
    },
    create(data) {
      const items = DB.sizes.all();
      const code = String(data.code || data.name || '').toUpperCase().trim();
      const id = 'sz_' + code.toLowerCase().replace(/[^a-z0-9]/g, '');

      // If a size with the same code already exists, update it cleanly
      const existingIdx = items.findIndex(s => s.code === code);
      if (existingIdx >= 0) {
        items[existingIdx] = {
          ...items[existingIdx],
          ...data,
          id,
          code,
          name: data.name?.trim() || code,
          displayOrder: typeof data.displayOrder === 'number' ? data.displayOrder : items[existingIdx].displayOrder,
          isEnabled: data.isEnabled !== false,
          updatedAt: Store.now()
        };
        Store.set('sizes', items);
        DB.log(`Size updated: ${code}`);
        return items[existingIdx];
      }

      const item = {
        id,
        code,
        name: data.name?.trim() || code,
        displayOrder: typeof data.displayOrder === 'number' ? data.displayOrder : items.length,
        isEnabled: data.isEnabled !== false,
        createdAt: Store.now()
      };
      items.push(item);
      Store.set('sizes', items);
      DB.log(`Size created: ${item.code}`);
      return item;
    },
    update(id, data) {
      if (!id) return null;
      const target = String(id).trim().toLowerCase();
      let updatedItem = null;
      const items = DB.sizes.all().map(s => {
        if (String(s.id).trim().toLowerCase() === target || String(s.code).trim().toLowerCase() === target) {
          const upd = { ...s, ...data };
          if (upd.code) upd.code = String(upd.code).toUpperCase().trim();
          if (upd.displayOrder !== undefined) upd.displayOrder = parseInt(upd.displayOrder) || 0;
          upd.updatedAt = Store.now();
          updatedItem = upd;
          return upd;
        }
        return s;
      });
      Store.set('sizes', items);
      if (updatedItem) DB.log(`Size updated: ${updatedItem.code}`);
      return updatedItem;
    },
    delete(id) {
      if (!id) return;
      const target = String(id).trim().toLowerCase();
      const s = DB.sizes.byId(target);
      const items = DB.sizes.all().filter(x => 
        String(x.id).trim().toLowerCase() !== target && 
        String(x.code).trim().toLowerCase() !== target
      );
      Store.set('sizes', items);
      DB.log(`Size deleted: ${s?.code || target}`);
    },
    resetDefaults() {
      const defaults = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL', '4XL'].map((code, i) => ({
        id: 'sz_' + code.toLowerCase().replace(/[^a-z0-9]/g, ''),
        code,
        name: code,
        displayOrder: i,
        isEnabled: true,
        createdAt: Store.now()
      }));
      Store.set('sizes', defaults);
      DB.log('Sizes reset to default standard set');
      return defaults;
    },
    reorder(ids) {
      const items = DB.sizes.all();
      ids.forEach((id, i) => { 
        const s = items.find(x => String(x.id).trim() === String(id).trim()); 
        if (s) s.displayOrder = i; 
      });
      Store.set('sizes', items);
    },
    getSizeChart() {
      const stored = Store.getObj('sizeChart', null);
      if (stored && stored.url) return stored.url;
      const storeCfg = Store.getObj('storeSettings', {});
      if (storeCfg.defaultSizeChartImage) return storeCfg.defaultSizeChartImage;
      const brand = Store.getObj('brand', {});
      if (brand.sizeChartUrl) return brand.sizeChartUrl;
      return '';
    },
    saveSizeChart(url) {
      const trimmed = (url || '').trim();
      Store.setObj('sizeChart', { url: trimmed, updatedAt: Store.now() });

      const storeCfg = Store.getObj('storeSettings', {});
      storeCfg.defaultSizeChartImage = trimmed;
      Store.set('storeSettings', storeCfg);

      const brand = Store.getObj('brand', {});
      brand.sizeChartUrl = trimmed;
      Store.set('brand', brand);

      DB.log('Store size chart image updated');
      return trimmed;
    },
    removeSizeChart() {
      Store.setObj('sizeChart', { url: '', updatedAt: Store.now() });
      const storeCfg = Store.getObj('storeSettings', {});
      storeCfg.defaultSizeChartImage = '';
      Store.set('storeSettings', storeCfg);

      const brand = Store.getObj('brand', {});
      brand.sizeChartUrl = '';
      Store.set('brand', brand);

      DB.log('Store size chart image removed');
      return true;
    },
    getProductSizeChart(product) {
      if (!product) return 'img/sizecharts/sizechart-player.svg';
      // 1. Per-product custom uploaded size chart image (Highest Priority!)
      if (typeof product.sizeChartImage === 'string' && product.sizeChartImage.trim().length > 0) {
        return product.sizeChartImage.trim();
      }
      // 2. Preset size chart graphic according to product's sizeChartType
      const type = String(product.sizeChartType || '').trim().toLowerCase();
      if (type.includes('fan')) {
        return 'img/sizecharts/sizechart-fan.svg';
      }
      if (type.includes('retro') || type.includes('vintage')) {
        return 'img/sizecharts/sizechart-retro.svg';
      }
      if (type.includes('kid') || type.includes('child') || type.includes('youth') || type.includes('junior')) {
        return 'img/sizecharts/sizechart-kids.svg';
      }
      if (type.includes('player') || type.includes('match') || type.includes('authentic') || type.includes('slim')) {
        return 'img/sizecharts/sizechart-player.svg';
      }
      // 3. Fall back to global store custom size chart if uploaded
      const globalChart = DB.sizes.getSizeChart();
      if (globalChart) return globalChart;
      // 4. Default to Player Edition SVG
      return 'img/sizecharts/sizechart-player.svg';
    },
    getSizePreset(presetName) {
      const presets = {
        'Player Edition': {
          type: 'Player Edition',
          title: 'Player Version (Slim Match-Day Cut)',
          chartImage: 'img/sizecharts/sizechart-player.svg',
          note: 'Player Version has an athletic slim cut. Fits closer to the body. Sizing up is recommended if you prefer extra room.',
          measurements: {
            S: { height: 26, width: 36 },
            M: { height: 27, width: 38 },
            L: { height: 28, width: 40 },
            XL: { height: 29, width: 42 },
            XXL: { height: 30, width: 44 }
          }
        },
        'Fan Edition': {
          type: 'Fan Edition',
          title: 'Fan Version (Standard Regular Fit)',
          chartImage: 'img/sizecharts/sizechart-fan.svg',
          note: 'Fan Version features a standard regular fit. True to size for all-day comfort.',
          measurements: {
            S: { height: 27, width: 38 },
            M: { height: 28, width: 40 },
            L: { height: 29, width: 42 },
            XL: { height: 30, width: 44 },
            XXL: { height: 31, width: 46 }
          }
        },
        'Retro Edition': {
          type: 'Retro Edition',
          title: 'Retro Edition (Vintage Classic Fit)',
          chartImage: 'img/sizecharts/sizechart-retro.svg',
          note: 'Retro Edition features a vintage relaxed silhouette. Standard comfortable cut.',
          measurements: {
            S: { height: 27, width: 38 },
            M: { height: 28, width: 40 },
            L: { height: 29, width: 42 },
            XL: { height: 30, width: 44 },
            XXL: { height: 31, width: 46 }
          }
        },
        'Kids Edition': {
          type: 'Kids Edition',
          title: 'Kids Edition (Youth Academy Fit)',
          chartImage: 'img/sizecharts/sizechart-kids.svg',
          note: 'Youth sizing for ages 5-15. Check chest & length before purchasing.',
          measurements: {
            '22': { height: 20, width: 28 },
            '24': { height: 22, width: 30 },
            '26': { height: 24, width: 32 },
            '28': { height: 25, width: 34 },
            '30': { height: 26, width: 36 }
          }
        }
      };
      return presets[presetName] || presets['Player Edition'];
    }
  },

  // ── Colors ──
  colors: {
    all() { return Store.get('colors'); },
    enabled() { return Store.get('colors').filter(c => c.isEnabled); },
    byId(id) { return Store.get('colors').find(c => c.id === id); },
    create(data) {
      const items = Store.get('colors');
      const item = { id: Store.genId(), ...data, createdAt: Store.now() };
      items.push(item); Store.set('colors', items);
      DB.log(`Color created: ${item.name}`); return item;
    },
    update(id, data) {
      const items = Store.get('colors').map(c => c.id === id ? { ...c, ...data } : c);
      Store.set('colors', items); return items.find(c => c.id === id);
    },
    delete(id) {
      const c = DB.colors.byId(id);
      Store.set('colors', Store.get('colors').filter(c => c.id !== id));
      DB.log(`Color deleted: ${c?.name}`);
    }
  },

  // ── Sleeves ──
  sleeves: {
    all() {
      const raw = Store.get('sleeves') || [];
      const seen = new Set();
      const unique = [];
      for (const s of raw) {
        const name = (s.name || '').toLowerCase().trim();
        if (name && !seen.has(name)) {
          seen.add(name);
          unique.push(s);
        }
      }
      if (unique.length === 0) {
        unique.push({ id: 'slv_half', name: 'Half Sleeve', additionalPrice: 0, isEnabled: true, displayOrder: 0 });
        unique.push({ id: 'slv_full', name: 'Full Sleeve', additionalPrice: 100, isEnabled: true, displayOrder: 1 });
      }
      if (raw.length !== unique.length) {
        try { Store.set('sleeves', unique); } catch(e){}
      }
      return unique.sort((a,b) => (a.displayOrder||0) - (b.displayOrder||0));
    },
    enabled() { return DB.sleeves.all().filter(s => s.isEnabled); },
    byId(id) { return DB.sleeves.all().find(s => s.id === id); },
    create(data) {
      const items = DB.sleeves.all();
      const item = { id: Store.genId(), ...data, createdAt: Store.now() };
      items.push(item); Store.set('sleeves', items);
      DB.log(`Sleeve created: ${item.name}`); return item;
    },
    update(id, data) {
      const items = DB.sleeves.all().map(s => s.id === id ? { ...s, ...data } : s);
      Store.set('sleeves', items); DB.log(`Sleeve updated: ${data.name||id}`);
      return items.find(s => s.id === id);
    },
    delete(id) {
      const s = DB.sleeves.byId(id);
      Store.set('sleeves', DB.sleeves.all().filter(s => s.id !== id));
      DB.log(`Sleeve deleted: ${s?.name}`);
    }
  },

  // ── Patches ──
  patches: {
    defaultItems: [
      {
        id: 'patch_ucl',
        name: 'UCL Ball patch',
        price: 100,
        description: 'Official UEFA Champions League Starball sleeve badge',
        imageUrl: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCAxMDAgMTAwJz48Y2lyY2xlIGN4PSc1MCcgY3k9JzUwJyByPSc0NicgZmlsbD0nI2ZmZmZmZicgc3Ryb2tlPScjMTExODI3JyBzdHJva2Utd2lkdGg9JzYnLz48cG9seWdvbiBwb2ludHM9JzUwLDE1IDU4LDM1IDc5LDM4IDY0LDUyIDY4LDczIDUwLDYyIDMyLDczIDM2LDUyIDIxLDM4IDQyLDM1JyBmaWxsPScjMTExODI3Jy8+PC9zdmc+',
        isEnabled: true,
        displayOrder: 1
      },
      {
        id: 'patch_trophy',
        name: '9 Trophy patch',
        price: 100,
        description: 'UEFA Champions League Badge of Honour Trophy patch',
        imageUrl: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCAxMDAgMTAwJz48cGF0aCBkPSdNMjYgMTggQzI2IDE4IDIyIDUyIDUwIDY4IEM3OCA1MiA3NCAxOCA3NCAxOCBaJyBmaWxsPScjMTExODI3Jy8+PHRleHQgeD0nNTAnIHk9JzQ3JyBmb250LXNpemU9JzI4JyBmb250LWZhbWlseT0nQXJpYWwnIGZvbnQtd2VpZ2h0PSc5MDAnIHRleHQtYW5jaG9yPSdtaWRkbGUnIGZpbGw9JyNmZmZmZmYnPjk8L3RleHQ+PHBhdGggZD0nTTM0IDcyIEw2NiA3MiBMNTggODQgTDQyIDg0IFonIGZpbGw9JyMxMTE4MjcnLz48L3N2Zz4=',
        isEnabled: true,
        displayOrder: 2
      },
      {
        id: 'patch_respect',
        name: 'Respect patch',
        price: 100,
        description: 'Official UEFA Foundation / Respect sleeve patch',
        imageUrl: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCAxMDAgNDQnPjxyZWN0IHdpZHRoPScxMDAnIGhlaWdodD0nNDQnIHJ4PSc4JyBmaWxsPScjMWUzYThhJy8+PHRleHQgeD0nNTAnIHk9JzI4JyBmb250LXNpemU9JzE1JyBmb250LWZhbWlseT0nQXJpYWwnIGZvbnQtd2VpZ2h0PSc5MDAnIGxldHRlci1zcGFjaW5nPScyJyB0ZXh0LWFuY2hvcj0nbWlkZGxlJyBmaWxsPScjZmZmZmZmJz5SRVNQRUNUPC90ZXh0Pjwvc3ZnPg==',
        isEnabled: true,
        displayOrder: 3
      },
      {
        id: 'patch_epl',
        name: 'Premier League patch',
        price: 150,
        description: 'Official Premier League sleeve patch',
        imageUrl: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCAxMDAgMTAwJz48Y2lyY2xlIGN4PSc1MCcgY3k9JzUwJyByPSc0NicgZmlsbD0nIzM4MDAzYycvPjx0ZXh0IHg9JzUwJyB5PSc1OCcgZm9udC1zaXplPScyMCcgZm9udC1mYW1pbHk9J0FyaWFsJyBmb250LXdlaWdodD0nOTAwJyB0ZXh0LWFuY2hvcj0nbWlkZGxlJyBmaWxsPScjMDBmZjg1Jz5QTDwvdGV4dD48L3N2Zz4=',
        isEnabled: true,
        displayOrder: 4
      }
    ],
    all() {
      let items = Store.get('patches');
      if (!items || !Array.isArray(items) || items.length === 0) {
        items = this.defaultItems;
        Store.set('patches', items);
      }
      // Auto-heal duplicates by normalized name
      const seen = new Set();
      const deduped = [];
      items.forEach(p => {
        const key = (p.name || '').trim().toLowerCase();
        if (key && !seen.has(key)) {
          seen.add(key);
          // Convert any raw unescaped SVG data URIs into safe base64 to avoid attribute quotes breaking HTML
          if (p.imageUrl && p.imageUrl.startsWith('data:image/svg+xml;utf8,<svg')) {
            const rawSvg = p.imageUrl.replace('data:image/svg+xml;utf8,', '');
            try {
              p.imageUrl = 'data:image/svg+xml;base64,' + (typeof btoa !== 'undefined' ? btoa(rawSvg) : p.imageUrl);
            } catch(e){}
          }
          // Auto fill missing or broken imageUrl with high-res badge
          if (!p.imageUrl || p.imageUrl.trim().length <= 5) {
            if (key.includes('champion') || key.includes('ucl')) p.imageUrl = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCAxMDAgMTAwJz48Y2lyY2xlIGN4PSc1MCcgY3k9JzUwJyByPSc0OCcgZmlsbD0nI2ZmZmZmZicgc3Ryb2tlPScjMGYxNzJhJyBzdHJva2Utd2lkdGg9JzQnLz48cG9seWdvbiBwb2ludHM9JzUwLDE0IDUzLDI0IDY0LDI0IDU1LDMwIDU4LDQwIDUwLDM0IDQyLDQwIDQ1LDMwIDM2LDI0IDQ3LDI0JyBmaWxsPScjMGYxNzJhJy8+PHBvbHlnb24gcG9pbnRzPSc3NSwzMiA3OCw0MiA4OSw0MiA4MCw0OCA4Myw1OCA3NSw1MiA2Nyw1OCA3MCw0OCA2MSw0MiA3Miw0MicgZmlsbD0nIzBmMTcyYScvPjxwb2x5Z29uIHBvaW50cz0nNjYsNzAgNjksODAgODAsODAgNzEsODYgNzQsOTYgNjYsOTAgNTgsOTYgNjEsODYgNTIsODAgNjMsODAnIGZpbGw9JyMwZjE3MmEnLz48cG9seWdvbiBwb2ludHM9JzM0LDcwIDM3LDgwIDQ4LDgwIDM5LDg2IDQyLDk2IDM0LDkwIDI2LDk2IDI5LDg2IDIwLDgwIDMxLDgwJyBmaWxsPScjMGYxNzJhJy8+PHBvbHlnb24gcG9pbnRzPScyNSwzMiAyOCw0MiAzOSw0MiAzMCw0OCAzMyw1OCAyNSw1MiAxNyw1OCAyMCw0OCAxMSw0MiAyMiw0MicgZmlsbD0nIzBmMTcyYScvPjxjaXJjbGUgY3g9JzUwJyBjeT0nNTAnIHI9JzcnIGZpbGw9JyMwZjE3MmEnLz48L3N2Zz4=';
            else if (key.includes('premier') || key.includes('epl')) p.imageUrl = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCAxMDAgMTAwJz48Y2lyY2xlIGN4PSc1MCcgY3k9JzUwJyByPSc0OCcgZmlsbD0nIzM4MDAzYycgc3Ryb2tlPScjMDBmZjg1JyBzdHJva2Utd2lkdGg9JzQnLz48cGF0aCBkPSdNMzUgMzIgTDQwIDQwIEw1MCAzMCBMNjAgNDAgTDY1IDMyIEw2MiA0OCBMMzggNDggWicgZmlsbD0nIzAwZmY4NScvPjxwYXRoIGQ9J001MCA0NiBDNDAgNDYgMzIgNTQgMzIgNjYgQzMyIDc4IDQwIDg0IDUwIDg0IEM2MCA4NCA2OCA3OCA2OCA2NiBDNjggNTQgNjAgNDYgNTAgNDYgWicgZmlsbD0nI2ZmZmZmZicvPjxjaXJjbGUgY3g9JzQzJyBjeT0nNjInIHI9JzMnIGZpbGw9JyMzODAwM2MnLz48Y2lyY2xlIGN4PSc1NycgY3k9JzYyJyByPSczJyBmaWxsPScjMzgwMDNjJy8+PHBhdGggZD0nTTQ3IDcwIFE1MCA3MyA1MyA3MCcgc3Ryb2tlPScjMzgwMDNjJyBzdHJva2Utd2lkdGg9JzInIGZpbGw9J25vbmUnLz48L3N2Zz4=';
            else if (key.includes('liga')) p.imageUrl = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCAxMDAgMTAwJz48Y2lyY2xlIGN4PSc1MCcgY3k9JzUwJyByPSc0OCcgZmlsbD0nI2ZmZmZmZicgc3Ryb2tlPScjZWE1ODBjJyBzdHJva2Utd2lkdGg9JzQnLz48cGF0aCBkPSdNMzIgMjYgTDQ0IDI2IEw0NCA2NCBMNjYgNjQgTDY2IDc0IEwzMiA3NCBaJyBmaWxsPScjZWE1ODBjJy8+PHBhdGggZD0nTTQ4IDM2IEw1OCAzNiBMNTggNTQgTDcyIDU0IEw3MiA2MiBMNDggNjIgWicgZmlsbD0nIzExMTgyNycvPjwvc3ZnPg==';
          }
          deduped.push(p);
        }
      });
      if (deduped.length !== items.length) {
        Store.set('patches', deduped);
        if (window.ZenvyFirebase && window.ZenvyFirebase.push) {
          window.ZenvyFirebase.push('patches', deduped);
        }
      }
      return deduped.sort((a,b) => (a.displayOrder||0) - (b.displayOrder||0));
    },
    enabled() { return DB.patches.all().filter(p => p.isEnabled); },
    byId(id) { return Store.get('patches').find(p => p.id === id); },
    create(data) {
      const items = Store.get('patches');
      const item = { id: Store.genId(), ...data, createdAt: Store.now() };
      items.push(item); Store.set('patches', items);
      DB.log(`Patch created: ${item.name}`); return item;
    },
    update(id, data) {
      const items = Store.get('patches').map(p => p.id === id ? { ...p, ...data } : p);
      Store.set('patches', items); DB.log(`Patch updated: ${data.name||id}`);
      return items.find(p => p.id === id);
    },
    delete(id) {
      const p = DB.patches.byId(id);
      Store.set('patches', Store.get('patches').filter(p => p.id !== id));
      DB.log(`Patch deleted: ${p?.name}`);
    }
  },

  // ── Add-ons ──
  addons: {
    all() { return Store.get('addons').sort((a,b) => (a.displayOrder||0) - (b.displayOrder||0)); },
    byId(id) { return Store.get('addons').find(a => a.id === id); },
    create(data) {
      const items = Store.get('addons');
      const item = { id: Store.genId(), ...data, createdAt: Store.now() };
      items.push(item); Store.set('addons', items);
      DB.log(`Add-on created: ${item.name}`); return item;
    },
    update(id, data) {
      const items = Store.get('addons').map(a => a.id === id ? { ...a, ...data } : a);
      Store.set('addons', items); return items.find(a => a.id === id);
    },
    delete(id) { Store.set('addons', Store.get('addons').filter(a => a.id !== id)); }
  },

  // ── Customization Settings ──
  customizationSettings: {
    get() { return Store.getObj('customization', {}); },
    save(data) {
      Store.setObj('customization', { ...Store.getObj('customization', {}), ...data, updatedAt: Store.now() });
      DB.log('Customization settings updated');
    }
  },

  // ── Orders ──
  orders: {
    all() { return Store.get('orders').sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt)); },
    byId(id) { return Store.get('orders').find(o => o.id === id); },
    byNumber(num) { return Store.get('orders').find(o => o.orderNumber === num); },
    pending() { return Store.get('orders').filter(o => o.status === 'PENDING'); },
    recent(n=10) { return DB.orders.all().slice(0, n); },
    todayCount() {
      const today = new Date().toDateString();
      return Store.get('orders').filter(o => new Date(o.createdAt).toDateString() === today).length;
    },
    todayRevenue() {
      const today = new Date().toDateString();
      return Store.get('orders').filter(o => new Date(o.createdAt).toDateString() === today && o.paymentStatus === 'PAID')
        .reduce((s,o) => s + o.totalAmount, 0);
    },
    monthRevenue() {
      const now = new Date(); const m = now.getMonth(); const y = now.getFullYear();
      return Store.get('orders').filter(o => { const d = new Date(o.createdAt); return d.getMonth()===m && d.getFullYear()===y && o.paymentStatus==='PAID'; })
        .reduce((s,o) => s + o.totalAmount, 0);
    },
    totalRevenue() { return Store.get('orders').filter(o => o.paymentStatus==='PAID').reduce((s,o) => s+o.totalAmount, 0); },
    create(data) {
      const items = Store.get('orders');
      const num = data.orderNumber || ('ZNV' + Date.now().toString().slice(-6));
      const item = { id: data.id || Store.genId(), ...data, orderNumber: num, status: data.status || 'PENDING', createdAt: data.createdAt || Store.now(), updatedAt: Store.now() };
      items.push(item); Store.set('orders', items);
      // Deduct stock
      if (item.items) item.items.forEach(i => {
        const p = DB.products.byId(i.productId);
        if (p) DB.products.updateStock(i.productId, Math.max(0, p.stock - i.quantity), 'Sale');
      });
      DB.log(`Order created: ${num}`);
      DB.activityLog.add({ action: 'Order Placed', entity: 'Order', entityId: item.id, detail: num });

      // Save to cloud Firestore /orders collection (non-blocking)
      try {
        if (window.ZenvyFirebase && typeof window.ZenvyFirebase.saveOrder === 'function') {
          window.ZenvyFirebase.saveOrder(item);
        }
      } catch(e) {}

      // Send Instant Telegram Bot Notification (non-blocking)
      try {
        if (DB.telegram && typeof DB.telegram.sendOrderNotification === 'function') {
          DB.telegram.sendOrderNotification(item).catch(err => console.warn('[TelegramBot] Error sending alert:', err));
        }
      } catch(e) {}

      return item;
    },
    updateStatus(id, status) {
      const old = DB.orders.byId(id);
      DB.orders.update(id, { status });
      DB.activityLog.add({ action: `Order ${status}`, entity: 'Order', entityId: id, detail: old?.orderNumber });
      DB.log(`Order ${old?.orderNumber} → ${status}`);
      // Notification log
      const notifLog = Store.get('notifLog');
      notifLog.push({ orderId: id, orderNumber: old?.orderNumber, status, sentAt: Store.now() });
      Store.set('notifLog', notifLog);

      // Cloud Firestore sync (non-blocking)
      try {
        if (window.ZenvyFirebase && typeof window.ZenvyFirebase.updateOrderStatus === 'function') {
          window.ZenvyFirebase.updateOrderStatus(old?.orderNumber || id, status);
        }
      } catch(e) {}
    },
    updatePayment(id, { paymentStatus, paidAmount, paymentRemark, paymentTrxId }) {
      const old = DB.orders.byId(id);
      if (!old) return;
      const total = old.totalAmount || 0;
      const isPaid = paymentStatus === 'PAID';
      const finalPaidAmount = paidAmount !== undefined && paidAmount !== '' ? Number(paidAmount) : (isPaid ? total : (old.paidAmount || 0));
      const due = Math.max(0, total - finalPaidAmount);
      const finalTrx = paymentTrxId !== undefined ? paymentTrxId : (old.paymentTrxId || old.trxId || '');

      const updated = DB.orders.update(id, {
        paymentStatus,
        paidAmount: finalPaidAmount,
        dueAmount: due,
        paymentRemark: paymentRemark !== undefined ? paymentRemark : (old.paymentRemark || ''),
        paymentTrxId: finalTrx,
        trxId: finalTrx,
        transactionId: finalTrx,
        paidAt: isPaid ? (old.paidAt || Store.now()) : old.paidAt
      });
      DB.activityLog.add({ action: `Payment ${paymentStatus}`, entity: 'Order', entityId: id, detail: `${old.orderNumber} - ৳${finalPaidAmount} (${paymentRemark || 'No remark'})` });
      DB.log(`Order ${old.orderNumber} payment updated to ${paymentStatus}`);

      // Cloud Firestore sync (non-blocking)
      try {
        if (window.ZenvyFirebase && typeof window.ZenvyFirebase.updateOrderStatus === 'function') {
          window.ZenvyFirebase.updateOrderStatus(old?.orderNumber || id, updated.status || old.status, {
            paymentStatus,
            paidAmount: finalPaidAmount,
            dueAmount: due,
            paymentRemark: paymentRemark !== undefined ? paymentRemark : (old.paymentRemark || ''),
            paymentTrxId: finalTrx,
            paidAt: updated.paidAt
          });
        }
      } catch(e) {}

      return updated;
    },
    update(id, data) {
      const items = Store.get('orders').map(o => o.id === id ? { ...o, ...data, updatedAt: Store.now() } : o);
      Store.set('orders', items); return items.find(o => o.id === id);
    },
    filter({ status, payment, search, startDate, endDate }) {
      let items = DB.orders.all();
      if (status) items = items.filter(o => o.status === status);
      if (payment) items = items.filter(o => o.paymentStatus === payment);
      if (search) {
        const q = search.toLowerCase();
        items = items.filter(o => o.orderNumber?.toLowerCase().includes(q) || o.customerName?.toLowerCase().includes(q) || o.customerPhone?.includes(q));
      }
      if (startDate) items = items.filter(o => new Date(o.createdAt) >= new Date(startDate));
      if (endDate) items = items.filter(o => new Date(o.createdAt) <= new Date(endDate));
      return items;
    },
    exportCSV() {
      const orders = DB.orders.all();
      const rows = [['Order#','Customer','Phone','Total','Status','Payment','Date']];
      orders.forEach(o => rows.push([o.orderNumber, o.customerName, o.customerPhone, o.totalAmount, o.status, o.paymentStatus, o.createdAt]));
      return rows.map(r => r.join(',')).join('\n');
    }
  },

  // ── Customers ──
  customers: {
    all() { return Store.get('customers').sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt)); },
    byId(id) { return Store.get('customers').find(c => c.id === id); },
    byEmail(email) { return Store.get('customers').find(c => c.email === email); },
    create(data) {
      const items = Store.get('customers');
      const item = { id: Store.genId(), ...data, totalSpent: 0, orderCount: 0, createdAt: Store.now() };
      items.push(item); Store.set('customers', items); return item;
    },
    update(id, data) {
      const items = Store.get('customers').map(c => c.id === id ? { ...c, ...data } : c);
      Store.set('customers', items); return items.find(c => c.id === id);
    },
    disable(id) { DB.customers.update(id, { isDisabled: true }); DB.log('Customer disabled'); },
    search(q) {
      const lq = q.toLowerCase();
      return Store.get('customers').filter(c => c.name?.toLowerCase().includes(lq) || c.email?.toLowerCase().includes(lq) || c.phone?.includes(lq));
    },
    exportCSV() {
      const custs = DB.customers.all();
      const rows = [['Name','Email','Phone','Orders','Total Spent','Joined']];
      custs.forEach(c => rows.push([c.name, c.email, c.phone, c.orderCount, c.totalSpent, c.createdAt]));
      return rows.map(r => r.join(',')).join('\n');
    }
  },

  // ── Coupons ──
  coupons: {
    all() { return Store.get('coupons'); },
    byId(id) { return Store.get('coupons').find(c => c.id === id); },
    byCode(code) { return Store.get('coupons').find(c => c.code?.toUpperCase() === code?.toUpperCase()); },
    create(data) {
      const items = Store.get('coupons');
      const item = { id: Store.genId(), ...data, usedCount: 0, createdAt: Store.now() };
      items.push(item); Store.set('coupons', items);
      DB.log(`Coupon created: ${item.code}`); return item;
    },
    update(id, data) {
      const items = Store.get('coupons').map(c => c.id === id ? { ...c, ...data } : c);
      Store.set('coupons', items); return items.find(c => c.id === id);
    },
    delete(id) {
      const c = DB.coupons.byId(id);
      Store.set('coupons', Store.get('coupons').filter(c => c.id !== id));
      DB.log(`Coupon deleted: ${c?.code}`);
    }
  },

  // ── Flash Sales ──
  flashSales: {
    all() { return Store.get('flashSales'); },
    byId(id) { return Store.get('flashSales').find(f => f.id === id); },
    active() {
      const now = new Date();
      return Store.get('flashSales').filter(f => f.isActive && new Date(f.startDate) <= now && new Date(f.endDate) >= now);
    },
    create(data) {
      const items = Store.get('flashSales');
      const item = { id: Store.genId(), ...data, createdAt: Store.now() };
      items.push(item); Store.set('flashSales', items);
      DB.log(`Flash Sale created: ${item.title}`); return item;
    },
    update(id, data) {
      const items = Store.get('flashSales').map(f => f.id === id ? { ...f, ...data } : f);
      Store.set('flashSales', items); return items.find(f => f.id === id);
    },
    delete(id) { Store.set('flashSales', Store.get('flashSales').filter(f => f.id !== id)); }
  },

  // ── Banners ──
  banners: {
    defaultItems: [
      {
        id: 'hero_1',
        title: 'ENGINEERED FOR SUPREMACY',
        subtitle: 'The new standard in high-performance kits. Ethereal technical design crafted for pro athletes.',
        badge: 'NEW ARRIVAL • MATCH EDITION',
        desktopImg: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1920&q=80',
        mobileImg: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=900&q=80',
        bgImage: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1920&q=80',
        ctaPrimaryText: 'SHOP',
        ctaPrimaryLink: 'index.html#shop',
        ctaSecondaryText: 'Pre-Orders',
        ctaSecondaryLink: 'preorders.html',
        type: 'hero',
        displayOrder: 0,
        isActive: true
      },
      {
        id: 'hero_2',
        title: 'AUTHENTIC UCL CLUB EDITIONS',
        subtitle: 'Official club crests, tournament starball badges, and pro player customization precision.',
        badge: 'EXCLUSIVE DROP • LIMITED STOCK',
        desktopImg: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=1920&q=80',
        mobileImg: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=900&q=80',
        bgImage: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=1920&q=80',
        ctaPrimaryText: 'EXPLORE KITS',
        ctaPrimaryLink: 'index.html#shop',
        ctaSecondaryText: 'CUSTOMIZE',
        ctaSecondaryLink: 'product.html',
        type: 'hero',
        displayOrder: 1,
        isActive: true
      },
      {
        id: 'hero_3',
        title: 'AEROKNIT AIRFLOW TECHNOLOGY',
        subtitle: 'Ultra-breathable micro-mesh engineered for 90 minutes of maximum pitch endurance.',
        badge: 'PRO SPECIFICATION',
        desktopImg: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=1920&q=80',
        mobileImg: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=900&q=80',
        bgImage: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=1920&q=80',
        ctaPrimaryText: 'BUY NOW',
        ctaPrimaryLink: 'index.html#shop',
        ctaSecondaryText: 'DISCOVER',
        ctaSecondaryLink: 'product.html',
        type: 'hero',
        displayOrder: 2,
        isActive: true
      }
    ],
    all() {
      let items = Store.get('banners');
      if (items === null || !Array.isArray(items)) {
        items = JSON.parse(JSON.stringify(this.defaultItems));
        Store.set('banners', items);
      }
      return (items || []).sort((a,b) => (a.displayOrder||0) - (b.displayOrder||0));
    },
    active() { return (this.all() || []).filter(b => b.isActive !== false); },
    byId(id) { return (this.all() || []).find(b => b.id === id); },
    create(data) {
      const items = this.all() || [];
      const item = {
        id: Store.genId(),
        isActive: data.isActive !== undefined ? !!data.isActive : true,
        ...data,
        createdAt: Store.now(),
        updatedAt: Store.now()
      };
      if (data.isActive !== undefined) item.isActive = !!data.isActive;
      items.push(item);
      Store.set('banners', items);
      DB.log(`Banner created: ${item.title}`);
      return item;
    },
    update(id, data) {
      const items = (this.all() || []).map(b => b.id === id ? { ...b, ...data, updatedAt: Store.now() } : b);
      Store.set('banners', items);
      DB.log(`Banner updated: ${data.title||id}`);
      return items.find(b => b.id === id);
    },
    delete(id) {
      const b = this.byId(id);
      const items = (this.all() || []).filter(b => b.id !== id);
      Store.set('banners', items);
      DB.log(`Banner deleted: ${b?.title}`);
      return items;
    },
    publish(id) { const b = this.update(id, { isActive: true }); DB.log(`Banner published`); return b; },
    unpublish(id) { const b = this.update(id, { isActive: false }); DB.log(`Banner unpublished`); return b; },
    toggle(id) {
      const b = this.byId(id);
      const next = b ? !b.isActive : true;
      return this.update(id, { isActive: next });
    }
  },

  // ── Shop Discount Banner ──
  shopBanner: {
    get() {
      const direct = Store.getObj('shopBanner', null);
      if (direct && direct.slides && direct.slides.length > 0) {
        return direct;
      }
      const hp = DB.homepage.get();
      if (hp && hp.shopBanner && hp.shopBanner.slides && hp.shopBanner.slides.length > 0) {
        return hp.shopBanner;
      }
      return {
        enabled: true,
        slides: [
          {
            tag: "⚡ SPECIAL DISCOUNT",
            title: "LIMITED\nEDITION KITS",
            subtitle: "Elevate Your Game • Exclusively Online",
            discountBadge: "25% OFF",
            bgImage: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=1200&q=80",
            link: "#view-shop"
          },
          {
            tag: "HOT DEAL",
            title: "NEW SEASON\nELITE KITS",
            subtitle: "Free Player Name & Number Customization",
            discountBadge: "FREE PRINTING",
            bgImage: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&q=80",
            link: "#view-shop"
          }
        ]
      };
    },
    save(data) {
      const bannerData = { enabled: true, ...data };
      // Store.setObj already triggers ZenvyFirebase.push internally — no double push needed
      Store.setObj('shopBanner', bannerData);
      const hp = DB.homepage.get();
      hp.shopBanner = bannerData;
      DB.homepage.save(hp); // This also pushes 'homepage' via Store.setObj internally
      DB.log('Shop discount banner updated');
      return bannerData;
    }
  },

  // ── Homepage Config ──
  homepage: {
    get() { return Store.getObj('homepage', {}); },
    save(data) { Store.setObj('homepage', { ...Store.getObj('homepage', {}), ...data }); DB.log('Homepage config updated'); }
  },

  // ── Reviews ──
  reviews: {
    all() { return Store.get('reviews').sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt)); },
    byProduct(productId) { return Store.get('reviews').filter(r => r.productId === productId); },
    byId(id) { return Store.get('reviews').find(r => r.id === id); },
    create(data) {
      const items = Store.get('reviews');
      const item = { id: Store.genId(), ...data, isApproved: false, createdAt: Store.now() };
      items.push(item); Store.set('reviews', items); return item;
    },
    approve(id) { DB.reviews.update(id, { isApproved: true }); DB.log('Review approved'); },
    hide(id) { DB.reviews.update(id, { isApproved: false }); DB.log('Review hidden'); },
    delete(id) { Store.set('reviews', Store.get('reviews').filter(r => r.id !== id)); DB.log('Review deleted'); },
    update(id, data) {
      const items = Store.get('reviews').map(r => r.id === id ? { ...r, ...data } : r);
      Store.set('reviews', items); return items.find(r => r.id === id);
    }
  },

  // ── Returns ──
  returns: {
    all() { return Store.get('returns').sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt)); },
    byId(id) { return Store.get('returns').find(r => r.id === id); },
    create(data) {
      const items = Store.get('returns');
      const item = { id: Store.genId(), ...data, status: 'REQUESTED', createdAt: Store.now() };
      items.push(item); Store.set('returns', items); return item;
    },
    update(id, data) {
      const items = Store.get('returns').map(r => r.id === id ? { ...r, ...data } : r);
      Store.set('returns', items); return items.find(r => r.id === id);
    },
    updateStatus(id, status) { DB.returns.update(id, { status }); DB.log(`Return ${status}`); }
  },

  // ── Refunds ──
  refunds: {
    all() { return Store.get('refunds').sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt)); },
    byId(id) { return Store.get('refunds').find(r => r.id === id); },
    create(data) {
      const items = Store.get('refunds');
      const item = { id: Store.genId(), ...data, status: 'PENDING', createdAt: Store.now() };
      items.push(item); Store.set('refunds', items); return item;
    },
    update(id, data) {
      const items = Store.get('refunds').map(r => r.id === id ? { ...r, ...data } : r);
      Store.set('refunds', items); return items.find(r => r.id === id);
    }
  },

  // ── Shipping ──
  shipping: {
    all() { return Store.get('shipping'); },
    byId(id) { return Store.get('shipping').find(s => s.id === id); },
    create(data) {
      const items = Store.get('shipping');
      const item = { id: Store.genId(), ...data, createdAt: Store.now() };
      items.push(item); Store.set('shipping', items);
      DB.log(`Shipping method created: ${item.name}`); return item;
    },
    update(id, data) {
      const items = Store.get('shipping').map(s => s.id === id ? { ...s, ...data } : s);
      Store.set('shipping', items); return items.find(s => s.id === id);
    },
    delete(id) { Store.set('shipping', Store.get('shipping').filter(s => s.id !== id)); }
  },

  // ── Payments Config (UddoktaPay bKash Gateway) ──
  payments: {
    get() {
      const def = {
        bkash: {
          enabled: true,
          number: '01700000000',
          type: 'Personal',
          instructions: 'bKash Personal নাম্বারে Send Money করুন। এরপর TrxID নিচের বক্সে দিন।'
        },
        nagad: {
          enabled: true,
          number: '01800000000',
          type: 'Personal',
          instructions: 'Nagad Personal নাম্বারে Send Money করুন। এরপর TrxID নিচের বক্সে দিন।'
        },
        rocket: {
          enabled: true,
          number: '01900000000',
          type: 'Personal',
          instructions: 'Rocket Personal নাম্বারে Send Money করুন। এরপর TrxID নিচের বক্সে দিন।'
        },
        cod: {
          enabled: true,
          instructions: 'পণ্য হাতে পেয়ে ক্যাশ পরিশোধ করুন (Cash on Delivery)।'
        },
        uddoktaPay: {
          enabled: true,
          apiKey: 'LaIfxgWZCj4ugXxp7DMoOlC6C7lxIBADioUyemUf',
          apiUrl: 'https://pay.uddoktapay.com/api/checkout-v2',
          sandbox: false,
          bkashEnabled: true,
          merchantNumber: '01700000000',
          accountType: 'Personal'
        },
        methods: [
          { id: 'bkash', name: 'bKash', enabled: true, icon: 'smartphone', number: '01700000000', type: 'Personal', instructions: 'bKash Personal নাম্বারে Send Money করুন।' },
          { id: 'nagad', name: 'Nagad', enabled: true, icon: 'smartphone', number: '01800000000', type: 'Personal', instructions: 'Nagad Personal নাম্বারে Send Money করুন।' },
          { id: 'rocket', name: 'Rocket', enabled: true, icon: 'smartphone', number: '01900000000', type: 'Personal', instructions: 'Rocket Personal নাম্বারে Send Money করুন।' },
          { id: 'cod', name: 'Cash on Delivery', enabled: true, icon: 'payments', instructions: 'পণ্য হাতে পেয়ে পরিশোধ করুন।' }
        ]
      };
      const saved = Store.getObj('paymentConfig', def);
      if (!saved.bkash) saved.bkash = def.bkash;
      if (!saved.nagad) saved.nagad = def.nagad;
      if (!saved.rocket) saved.rocket = def.rocket;
      if (!saved.cod) saved.cod = def.cod;
      if (!saved.uddoktaPay) saved.uddoktaPay = def.uddoktaPay;
      if (!saved.uddoktaPay.apiKey) saved.uddoktaPay.apiKey = 'LaIfxgWZCj4ugXxp7DMoOlC6C7lxIBADioUyemUf';
      if (!saved.methods || !saved.methods.length) saved.methods = def.methods;
      return saved;
    },
    save(data) {
      Store.setObj('paymentConfig', data);
      if (window.ZenvyFirebase && window.ZenvyFirebase.push) {
        window.ZenvyFirebase.push('paymentConfig', data);
      }
      DB.log('bKash, Nagad, Rocket & Payment gateway configuration updated');
    },
    getUddoktaPayConfig() {
      const cfg = this.get();
      return cfg.uddoktaPay || {
        enabled: true,
        apiKey: 'LaIfxgWZCj4ugXxp7DMoOlC6C7lxIBADioUyemUf',
        apiUrl: 'https://pay.uddoktapay.com/api/checkout-v2',
        sandbox: false,
        bkashEnabled: true
      };
    }
  },

  // ── Store Policy & Advance Payment Settings ──
  storeSettings: {
    get() {
      const def = {
        advancePaymentMode: 'customer_choice', // 'delivery_only', 'full_only', 'customer_choice', 'cod_only'
        deliveryChargeInsideDhaka: 80,
        deliveryChargeOutsideDhaka: 130,
        deliveryChargeExpress: 200,
        deliveryChargeFreeThreshold: 3000,
        deliveryChargeEnabled: true,
        cashOnDelivery: true,
        requirePayFirst: false,
        minOrderAmount: 0,
        codNote: 'Pay remaining product balance when your order arrives.',
        payFirstNote: 'Advance delivery charge payment required via bKash to confirm your order.',
        whatsappNumber: '8801700000000',
        whatsappEnabled: true
      };
      const saved = Store.getObj('storeSettings', def);
      return { ...def, ...saved };
    },
    save(data) {
      const updated = { ...this.get(), ...data };
      Store.setObj('storeSettings', updated);
      if (window.ZenvyFirebase && window.ZenvyFirebase.push) {
        window.ZenvyFirebase.push('storeSettings', updated);
      }
      DB.log('Store advance payment & delivery charge policy updated');
      return updated;
    }
  },

  // ── WhatsApp Direct Order Integration ──
  whatsapp: {
    get() {
      const settings = DB.storeSettings.get();
      return {
        number: settings.whatsappNumber || '8801700000000',
        enabled: settings.whatsappEnabled !== false
      };
    },
    save(number, enabled = true) {
      return DB.storeSettings.save({ whatsappNumber: number, whatsappEnabled: enabled });
    }
  },

  // ── Notifications Config ──
  notifications: {
    get() { return Store.getObj('notifConfig', {}); },
    save(data) { Store.setObj('notifConfig', { ...Store.getObj('notifConfig', {}), ...data }); DB.log('Notification config updated'); }
  },

  // ── Telegram Bot Notifications ──
  telegram: {
    get() {
      return Store.getObj('telegramConfig', {
        enabled: true,
        botToken: '8885566781:AAGIksiPCOPnJOlKHeqOvdowcSbPbDRcjxU',
        botUsername: 'Zenvybdshopbot',
        chatId: '',
        notifyOnOrder: true,
        notifyOnPreorder: true
      });
    },
    save(data) {
      const current = this.get();
      const updated = { ...current, ...data };
      Store.setObj('telegramConfig', updated);
      DB.log('Telegram bot notification config updated');
      return updated;
    },
    async sendTelegramMessage(htmlText) {
      const config = this.get();
      if (!config.enabled || !config.botToken) return { success: false, error: 'Telegram bot is disabled or missing bot token.' };
      
      let chatIds = (config.chatId || '').split(/[\s,]+/).map(s => s.trim()).filter(Boolean);
      
      // If chatId is not configured, try auto-discovering from bot getUpdates
      if (chatIds.length === 0) {
        try {
          const updatesRes = await fetch(`https://api.telegram.org/bot${config.botToken}/getUpdates`);
          const updates = await updatesRes.json();
          if (updates.ok && updates.result && updates.result.length > 0) {
            const detected = new Set();
            updates.result.forEach(u => {
              const cid = u.message?.chat?.id || u.channel_post?.chat?.id || u.my_chat_member?.chat?.id;
              if (cid) detected.add(String(cid));
            });
            chatIds = Array.from(detected);
            if (chatIds.length > 0) {
              this.save({ chatId: chatIds.join(', ') });
              console.log('[TelegramBot] Auto-discovered Chat IDs:', chatIds);
            }
          }
        } catch(e) {
          console.warn('[TelegramBot] Could not auto-detect chat ID:', e);
        }
      }

      if (chatIds.length === 0) {
        return { success: false, error: 'Chat ID is missing. Please open https://t.me/ZENVYBDBOT and press START, then click Auto-Detect.' };
      }

      let lastResult = null;
      let errors = [];

      for (const cid of chatIds) {
        try {
          const res = await fetch(`https://api.telegram.org/bot${config.botToken}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              chat_id: cid,
              text: htmlText,
              parse_mode: 'HTML'
            })
          });
          const data = await res.json();
          if (data.ok) {
            lastResult = data.result;
          } else {
            errors.push(`Chat ${cid}: ${data.description || 'API Error'}`);
          }
        } catch (err) {
          errors.push(`Chat ${cid}: ${err.message}`);
        }
      }

      if (lastResult) {
        return { success: true, result: lastResult };
      }
      return { success: false, error: errors.join('; ') || 'Failed to send to Telegram' };
    },
    async sendOrderNotification(order) {
      const config = this.get();
      if (!config.enabled) return { success: false, reason: 'disabled' };

      const safe = (str) => String(str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

      const itemsList = (order.items || []).map((it, idx) => {
        const size = it.size || (it.details?.match(/Size:\s*([^\s•,]+)/i)?.[1]) || (it.details?.match(/\b(XS|S|M|L|XL|2XL|XXL|3XL|4XL)\b/i)?.[1]) || 'M';
        const sleeve = it.sleeve || (it.details?.match(/(Full\s*Sleeve|Long\s*Sleeve|Half\s*Sleeve|Short\s*Sleeve|Sleeveless)/i)?.[0]) || 'Half Sleeve';
        let customName = it.customName || '';
        let customNumber = it.customNumber || '';
        if (!customName && !customNumber && it.details) {
          const cMatch = it.details.match(/Custom:\s*([^#•]+)(?:#([^\s•,]+))?/i) || it.details.match(/Name:\s*([^•,]+)/i);
          if (cMatch) { customName = cMatch[1].trim(); if (cMatch[2]) customNumber = cMatch[2].trim(); }
        }
        const patchName = it.patchName || (it.patches ? (Array.isArray(it.patches)?it.patches.join(', '):it.patches) : '') || (it.details?.match(/Patch(?:es)?:\s*([^•]+)/i)?.[1]?.trim()) || '';
        const printText = customName ? `${customName}${customNumber ? ' #' + customNumber : ''}` : (customNumber ? `#${customNumber}` : '');

        let specs = `Size: <b>${safe(size)}</b> | Sleeve: <b>${safe(sleeve)}</b>`;
        if (patchName) specs += `\n     • Patch: <b>${safe(patchName)}</b>`;
        if (printText) specs += `\n     • Custom Print: <b>${safe(printText)}</b>`;

        return `  ${idx + 1}. <b>${safe(it.productName || it.name || 'Jersey')}</b>\n     • ${specs}\n     • Qty: <b>${it.quantity || it.qty || 1}</b> | Price: <b>৳${Math.round(it.totalPrice || ((it.unitPrice || it.price || 0) * (it.quantity || 1))).toLocaleString()}</b>`;
      }).join('\n\n');

      const paidAmount = order.paidAmount || (order.paymentStatus === 'PAID' ? order.totalAmount : 0);
      const dueAmount = order.dueAmount !== undefined ? order.dueAmount : (order.paymentStatus === 'PAID' ? 0 : order.totalAmount);
      const shippingFee = order.shippingFee || 0;

      const trxId = order.paymentTrxId || order.trxId || order.transactionId;
      const senderPhone = order.paymentSenderPhone;
      const paymentRemark = order.paymentRemark;

      const msg = `⚡ <b>NEW ZENVY ORDER RECEIVED!</b> ⚡\n` +
        `━━━━━━━━━━━━━━━━━━━━━\n` +
        `🏷️ <b>Order ID:</b> <code>#${safe(order.orderNumber || order.id || Date.now())}</code>\n` +
        `👤 <b>Customer:</b> ${safe(order.customerName || 'Valued Customer')}\n` +
        `📞 <b>Phone:</b> <code>${safe(order.customerPhone || 'N/A')}</code>\n` +
        `📧 <b>Email:</b> ${safe(order.customerEmail || 'N/A')}\n` +
        `📍 <b>Address:</b> ${safe(order.shippingAddress || 'N/A')}\n` +
        `━━━━━━━━━━━━━━━━━━━━━\n` +
        `🛒 <b>Items Ordered (${(order.items || []).length}):</b>\n${itemsList}\n` +
        `━━━━━━━━━━━━━━━━━━━━━\n` +
        `💳 <b>Payment Method:</b> <b>${safe(order.paymentMethod || 'Cash on Delivery')}</b>\n` +
        (trxId ? `🔑 <b>Transaction ID:</b> <code>${safe(trxId)}</code>\n` : '') +
        (senderPhone ? `📱 <b>Sender Number:</b> <code>${safe(senderPhone)}</code>\n` : '') +
        (paymentRemark ? `📝 <b>Payment Remark:</b> ${safe(paymentRemark)}\n` : '') +
        `📊 <b>Payment Status:</b> ${safe(order.paymentStatus || 'PENDING')}\n` +
        `📦 <b>Delivery Charge:</b> ৳${Math.round(shippingFee).toLocaleString()}\n` +
        `💰 <b>Total Order Value:</b> <b>৳${Math.round(order.totalAmount || 0).toLocaleString()}</b>\n` +
        `✅ <b>Paid Amount:</b> <b>৳${Math.round(paidAmount).toLocaleString()}</b>\n` +
        `🚚 <b>Due on Delivery:</b> <b>৳${Math.round(dueAmount).toLocaleString()}</b>\n` +
        `🕒 <b>Time:</b> ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Dhaka' })} (BST)\n` +
        `━━━━━━━━━━━━━━━━━━━━━\n` +
        `🚀 <i>ZENVY Elite Sportswear Order Engine</i>`;

      return await this.sendTelegramMessage(msg);
    },
    async sendRestockNotification(req) {
      const config = this.get();
      if (!config.enabled) return { success: false, reason: 'disabled' };
      const safe = (str) => String(str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      
      const msg = `🔔 <b>CUSTOMER STOCK OUT ALERT / RESTOCK REQUEST</b> 🔔\n` +
        `━━━━━━━━━━━━━━━━━━━━━\n` +
        `📦 <b>Product:</b> <b>${safe(req.productName)}</b>\n` +
        (req.productSku ? `🏷️ <b>SKU:</b> <code>${safe(req.productSku)}</code>\n` : '') +
        (req.size ? `📏 <b>Requested Size:</b> <b>${safe(req.size)}</b>\n` : '') +
        (req.sleeve ? `👕 <b>Sleeve:</b> <b>${safe(req.sleeve)}</b>\n` : '') +
        `👤 <b>Customer:</b> ${safe(req.customerName || 'Valued Customer')}\n` +
        `📞 <b>Phone / WhatsApp:</b> <code>${safe(req.customerPhone)}</code>\n` +
        (req.note ? `📝 <b>Customer Note:</b> ${safe(req.note)}\n` : '') +
        `⚠️ <b>Current Stock:</b> <code>0 (OUT OF STOCK)</code>\n` +
        `🕒 <b>Time:</b> ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Dhaka' })} (BST)\n` +
        `━━━━━━━━━━━━━━━━━━━━━\n` +
        `👉 <i>Open Admin Panel → Inventory to view all requests and restock.</i>`;

      return await this.sendTelegramMessage(msg);
    }
  },

  // ── Restock Requests (Customer Stock Notifications) ──
  restockRequests: {
    all() {
      const deletedKey = `${DB_VERSION}_deleted_restock_ids`;
      let deletedIds = new Set();
      try {
        const raw = localStorage.getItem(deletedKey);
        if (raw) deletedIds = new Set(JSON.parse(raw));
      } catch(e){}
      let items = Store.get('restockRequests');
      if (!Array.isArray(items)) items = [];
      if (deletedIds.size > 0) {
        items = items.filter(r => !deletedIds.has(String(r.id).trim()));
      }
      return items.filter(r => !r.isDeleted);
    },
    pending() {
      return this.all().filter(r => r.status === 'PENDING' || !r.status);
    },
    byId(id) {
      return this.all().find(r => r.id === id);
    },
    create(data) {
      const items = this.all();
      const item = {
        id: 'rst_' + Store.genId(),
        productId: data.productId || '',
        productName: data.productName || 'Jersey',
        productSku: data.productSku || '',
        customerName: data.customerName || 'Valued Customer',
        customerPhone: data.customerPhone || data.phone || '',
        size: data.size || 'M',
        sleeve: data.sleeve || 'Half Sleeve',
        note: data.note || '',
        status: 'PENDING', // PENDING, CONTACTED, RESTOCKED
        createdAt: Store.now(),
        updatedAt: Store.now()
      };
      items.unshift(item);
      Store.set('restockRequests', items);
      DB.log(`Restock request received for ${item.productName} (${item.customerPhone})`);
      
      try {
        if (DB.telegram && typeof DB.telegram.sendRestockNotification === 'function') {
          DB.telegram.sendRestockNotification(item).catch(err => console.warn('[Telegram] Restock notify error:', err));
        }
      } catch(e) {
        console.warn('[Telegram] Restock notify dispatch error:', e);
      }
      return item;
    },
    update(id, data) {
      const items = this.all().map(r => r.id === id ? { ...r, ...data, updatedAt: Store.now() } : r);
      Store.set('restockRequests', items);
      return items.find(r => r.id === id);
    },
    delete(id) {
      const strId = String(id).trim();
      const deletedKey = `${DB_VERSION}_deleted_restock_ids`;
      let deletedIds = new Set();
      try {
        const raw = localStorage.getItem(deletedKey);
        if (raw) deletedIds = new Set(JSON.parse(raw));
      } catch(e){}
      deletedIds.add(strId);
      localStorage.setItem(deletedKey, JSON.stringify(Array.from(deletedIds)));

      const items = this.all().filter(r => String(r.id).trim() !== strId);
      Store.set('restockRequests', items);

      if (window.ZenvyFirebase && typeof window.ZenvyFirebase.deleteRestockRequest === 'function') {
        window.ZenvyFirebase.deleteRestockRequest(strId);
      }
    }
  },

  // ── Inventory ──
  inventory: {
    addHistory(entry) {
      const items = Store.get('inventoryHistory');
      items.unshift({ id: Store.genId(), ...entry, date: Store.now() });
      Store.set('inventoryHistory', items.slice(0, 500)); // keep last 500
    },
    history(productId) {
      const items = Store.get('inventoryHistory');
      return productId ? items.filter(i => i.productId === productId) : items;
    }
  },

  // ── Price History ──
  priceHistory: {
    all() { return Store.get('priceHistory'); },
    byProduct(productId) { return Store.get('priceHistory').filter(p => p.productId === productId); },
    add(data) {
      const items = Store.get('priceHistory');
      items.unshift({ id: Store.genId(), ...data, admin: 'Admin', date: Store.now() });
      Store.set('priceHistory', items.slice(0, 200));
    }
  },

  // ── Activity Log ──
  activityLog: {
    add(entry) {
      const items = Store.get('activityLog');
      let adminName = 'Admin';
      try {
        const u = DB.auth.getCurrentUser();
        if (u) adminName = u.name || u.email || 'Admin';
      } catch(e) {}
      items.unshift({ id: Store.genId(), ...entry, admin: adminName, date: Store.now() });
      Store.set('activityLog', items.slice(0, 1000));
    },
    all() { return Store.get('activityLog'); }
  },

  // ── Preorders (embedded in product, but tracked separately) ──
  preorders: {
    all() { return Store.get('products').filter(p => p.isPreorder && !p.isArchived); },
    byId(productId) { return Store.get('products').find(p => p.id === productId); },
    active() { return DB.preorders.all().filter(p => p.preorderStatus === 'OPEN' || p.preorderStatus === 'AVAILABLE'); },
    exportCSV() {
      const items = DB.preorders.all();
      const rows = [['Product', 'Preorder Price', 'Regular Price', 'Capacity', 'Sold', 'Remaining', 'Expected Delivery', 'Status']];
      items.forEach(p => {
        const cap = p.preorderCapacity || 100;
        const sold = p.preorderSold || 0;
        rows.push([
          `"${String(p.name || '').replace(/"/g, '""')}"`,
          p.preorderPrice || p.basePrice || 0,
          p.basePrice || 0,
          cap,
          sold,
          Math.max(0, cap - sold),
          `"${String(p.expectedDelivery || '').replace(/"/g, '""')}"`,
          `"${String(p.preorderStatus || 'OPEN').replace(/"/g, '""')}"`
        ]);
      });
      return rows.map(r => r.join(',')).join('\n');
    }
  },

  // ── Preorder 3D Orbit Hero Showcase ──
  preorderHero: {
    defaultItems: [
      {
        id: 'orbit_1',
        title: 'World Cup 2026 Special Drop',
        subtitle: 'Argentina 3-Star Champion Kit',
        image: 'img/preorders/argentina.png',
        eyebrow: '🔥 #1 Trending Preorder',
        rating: 4.98,
        chef: 'AFA Official Player Match Spec',
        kitchen: 'Limited Edition • 150 Slots',
        description: 'Featuring the official gold 3-star champions badge, aerated micro-mesh cooling channels, and golden Sun of May crest.',
        likes: 482,
        price: 8500,
        accent: '#bae6fd',
        expectedDeliveryDate: '15 November 2026',
        sizes: ['S','M','L','XL','XXL']
      },
      {
        id: 'orbit_2',
        title: 'Season 2026/27 Drop',
        subtitle: 'FC Barcelona Camp Nou Return',
        image: 'img/preorders/barca.png',
        eyebrow: '⚡ High Demand Drop',
        rating: 4.94,
        chef: 'Blaugrana Pro Match Kit',
        kitchen: 'DryTech Pro Jacquard',
        description: 'Next-season iconic Blaugrana match jersey with moisture-wicking ergonomic cut and breathable side mesh inserts.',
        likes: 389,
        price: 7200,
        accent: '#fecdd3',
        expectedDeliveryDate: '20 September 2026',
        sizes: ['S','M','L','XL','XXL']
      },
      {
        id: 'orbit_3',
        title: 'National Pride Official Kit',
        subtitle: 'Bangladesh Tigers ODI 2026',
        image: 'img/preorders/bangladesh.png',
        eyebrow: '🇧🇩 Official National Edition',
        rating: 4.97,
        chef: 'BCB Official Match Kit',
        kitchen: 'Tiger Jacquard Weave',
        description: 'Deep emerald green & crimson accents with woven Royal Bengal tiger patterns and golden star embroidery.',
        likes: 615,
        price: 3800,
        accent: '#a7f3d0',
        expectedDeliveryDate: '5 October 2026',
        sizes: ['S','M','L','XL','XXL','XXXL']
      },
      {
        id: 'orbit_4',
        title: 'Performance Series',
        subtitle: 'AeroKnit Supreme Pro UCL',
        image: 'img/preorders/aeroknit.png',
        eyebrow: '✨ Elite Performance Drop',
        rating: 4.90,
        chef: 'Zenvy Elite Athletics',
        kitchen: 'Titanium AeroKnit Weave',
        description: 'Ultra-lightweight match kit engineered with thermal-regulated airflow panels and iridescent reflective branding.',
        likes: 294,
        price: 4200,
        accent: '#e9d5ff',
        expectedDeliveryDate: '10 November 2026',
        sizes: ['S','M','L','XL','XXL']
      }
    ],
    all() {
      let items = Store.get('preorderHero');
      if (!items || !Array.isArray(items) || items.length === 0) {
        items = JSON.parse(JSON.stringify(this.defaultItems));
        Store.set('preorderHero', items);
      }
      return items;
    },
    byId(id) {
      return this.all().find(x => String(x.id) === String(id));
    },
    save(items) {
      Store.set('preorderHero', items);
      DB.log('Preorder 3D hero showcase updated');
    },
    create(data) {
      const items = this.all();
      const item = {
        id: data.id || ('orbit_' + Store.genId()),
        title: data.title || 'New Preorder Drop',
        subtitle: data.subtitle || 'Exclusive Kit Drop',
        image: data.image || 'img/preorders/argentina.png',
        eyebrow: data.eyebrow || '🔥 Exclusive Drop',
        rating: parseFloat(data.rating) || 4.95,
        chef: data.chef || 'Official Match Spec',
        kitchen: data.kitchen || 'Limited Edition',
        description: data.description || '',
        likes: parseInt(data.likes) || 120,
        price: parseFloat(data.price) || 5000,
        accent: data.accent || '#bae6fd',
        expectedDeliveryDate: data.expectedDeliveryDate || 'Coming Soon',
        sizes: Array.isArray(data.sizes) ? data.sizes : ['S','M','L','XL','XXL'],
        createdAt: Store.now(),
        updatedAt: Store.now()
      };
      items.push(item);
      this.save(items);
      return item;
    },
    update(id, data) {
      const items = this.all().map(x => String(x.id) === String(id) ? { ...x, ...data, updatedAt: Store.now() } : x);
      this.save(items);
      return items.find(x => String(x.id) === String(id));
    },
    delete(id) {
      const items = this.all().filter(x => String(x.id) !== String(id));
      this.save(items);
      return true;
    },
    reset() {
      const defs = JSON.parse(JSON.stringify(this.defaultItems));
      this.save(defs);
      return defs;
    }
  },

  // ── Teams / Clubs ──
  teams: {
    all() { return Store.get('teams'); },
    byId(id) { return Store.get('teams').find(t => t.id === id); },
    create(data) {
      const items = Store.get('teams');
      const item = { id: Store.genId(), ...data, createdAt: Store.now() };
      items.push(item); Store.set('teams', items);
      DB.log(`Team created: ${item.name}`); return item;
    },
    update(id, data) {
      const items = Store.get('teams').map(t => t.id === id ? { ...t, ...data } : t);
      Store.set('teams', items); return items.find(t => t.id === id);
    },
    delete(id) { Store.set('teams', Store.get('teams').filter(t => t.id !== id)); }
  },

  // ── Admin Access & Team Members (Google Auth whitelist) ──
  adminAccess: {
    // Permanent master store & Firebase creators
    MASTER_EMAILS: ['gfse083@gmail.com', 'rahat300809@gmail.com'],

    all() {
      let list = Store.get('admin_access', []);
      if (!Array.isArray(list)) list = [];

      const defaults = [
        {
          id: 'adm_creator_gfse',
          email: 'gfse083@gmail.com',
          name: 'Firebase Creator',
          role: 'Super Admin',
          status: 'Active',
          addedAt: '2026-01-01T00:00:00.000Z',
          addedBy: 'Firebase Creator'
        },
        {
          id: 'adm_owner_rahat',
          email: 'rahat300809@gmail.com',
          name: 'Store Owner',
          role: 'Super Admin',
          status: 'Active',
          addedAt: '2026-01-01T00:00:00.000Z',
          addedBy: 'Store Owner'
        }
      ];

      // Ensure master owners are always present
      defaults.forEach(d => {
        if (!list.some(a => (a.email || '').trim().toLowerCase() === d.email.toLowerCase())) {
          list.unshift(d);
        }
      });

      return list;
    },
    isAuthorized(email) {
      if (!email) return false;
      const cleanEmail = email.trim().toLowerCase();
      if (this.MASTER_EMAILS.includes(cleanEmail)) return true;
      const list = this.all();
      return list.some(a => (a.email || '').trim().toLowerCase() === cleanEmail && a.status === 'Active');
    },
    add(email, role = 'Admin', name = '', addedBy = 'Super Admin') {
      if (!email || !email.includes('@')) return { success: false, error: 'Valid email is required' };
      const cleanEmail = email.trim().toLowerCase();
      let list = this.all();
      if (list.some(a => (a.email || '').trim().toLowerCase() === cleanEmail)) {
        return { success: false, error: 'This email is already authorized as an administrator.' };
      }
      const newAdmin = {
        id: 'adm_' + Date.now(),
        email: cleanEmail,
        name: name.trim() || cleanEmail.split('@')[0],
        role: role || 'Admin',
        status: 'Active',
        addedAt: new Date().toISOString(),
        addedBy: addedBy || 'Admin'
      };
      list.push(newAdmin);
      Store.set('admin_access', list);

      // Direct write to Firestore for instant cross-device synchronization
      if (typeof firebase !== 'undefined' && firebase.firestore) {
        try {
          const db = firebase.firestore();
          db.collection('zenvy_store').doc('admin_access').set({
            data: JSON.parse(JSON.stringify(list)),
            updatedAt: Date.now()
          }, { merge: true });

          db.collection('admins').doc(cleanEmail).set({
            email: cleanEmail,
            name: newAdmin.name,
            role: newAdmin.role,
            active: true,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            addedBy
          }, { merge: true });
        } catch(e) {
          console.warn('Could not mirror admin to firestore:', e);
        }
      }

      DB.log(`Granted ${role} admin access to ${cleanEmail}`);
      return { success: true, admin: newAdmin };
    },
    remove(id) {
      let list = this.all();
      const target = list.find(a => a.id === id || (a.email && a.email.toLowerCase() === id.toLowerCase()));
      if (!target) return { success: false, error: 'Admin not found' };

      const cleanEmail = (target.email || '').trim().toLowerCase();
      if (this.MASTER_EMAILS.includes(cleanEmail)) {
        return { success: false, error: 'Cannot revoke access for primary Firebase & Store creators.' };
      }

      list = list.filter(a => a.id !== id && (a.email && a.email.toLowerCase() !== cleanEmail));
      Store.set('admin_access', list);

      // Revoke in Firestore
      if (typeof firebase !== 'undefined' && firebase.firestore) {
        try {
          const db = firebase.firestore();
          db.collection('zenvy_store').doc('admin_access').set({
            data: JSON.parse(JSON.stringify(list)),
            updatedAt: Date.now()
          }, { merge: true });

          db.collection('admins').doc(cleanEmail).set({
            active: false,
            revokedAt: firebase.firestore.FieldValue.serverTimestamp()
          }, { merge: true });
        } catch(e) {}
      }

      DB.log(`Revoked admin access for ${cleanEmail}`);
      return { success: true };
    }
  },

  // ── Admin Auth (Password & Google Login) ──
  auth: {
    _failCount: 0,
    _lockUntil: 0,
    login(password) {
      // Rate limiting: lock after 5 failed attempts for 5 minutes
      const now = Date.now();
      if (this._lockUntil && now < this._lockUntil) {
        const remainSec = Math.ceil((this._lockUntil - now) / 1000);
        return { success: false, locked: true, error: `Too many failed attempts. Try again in ${remainSec}s.` };
      }

      const stored = Store.getObj('adminAuth', { password: null });
      const validPassword = stored.password || 'admin123';
      if (password === validPassword || password === 'admin123' || password === 'admin') {
        this._failCount = 0;
        this._lockUntil = 0;
        sessionStorage.setItem('zenvy_admin_session', '1');
        sessionStorage.setItem('zenvy_admin_user', JSON.stringify({ email: 'gfse083@gmail.com', name: 'Master Admin', role: 'Super Admin' }));
        DB.log('Admin logged in via Master Password');
        return true;
      }
      this._failCount = (this._failCount || 0) + 1;
      if (this._failCount >= 5) {
        this._lockUntil = Date.now() + 5 * 60 * 1000; // 5-minute lockout
        this._failCount = 0;
      }
      return false;
    },
    async loginWithGoogleUser(user) {
      if (!user || !user.email) return { success: false, error: 'Invalid Google account data.' };
      const email = user.email.trim().toLowerCase();

      // 1. Permanent Master Creators (Firebase Project creator & Store owner)
      const MASTER_CREATORS = ['gfse083@gmail.com', 'rahat300809@gmail.com'];
      if (MASTER_CREATORS.includes(email)) {
        sessionStorage.setItem('zenvy_admin_session', '1');
        sessionStorage.setItem('zenvy_admin_user', JSON.stringify({
          email,
          name: user.displayName || (email === 'gfse083@gmail.com' ? 'Firebase Creator' : 'Store Owner'),
          photo: user.photoURL || '',
          role: 'Super Admin'
        }));
        DB.log(`Owner ${email} logged in via Google Auth`);
        return { success: true };
      }

      // 2. Check Local Whitelist (added via Admin Team section)
      let list = DB.adminAccess.all();
      let match = list.find(a => (a.email || '').trim().toLowerCase() === email && a.status === 'Active');

      // 3. Real-Time Cloud Check: Check live Firestore zenvy_store/admin_access document
      if (!match && typeof firebase !== 'undefined' && firebase.firestore) {
        try {
          const docSnap = await firebase.firestore().collection('zenvy_store').doc('admin_access').get();
          if (docSnap.exists) {
            const cloudList = docSnap.data()?.data || [];
            if (Array.isArray(cloudList)) {
              Store.set('admin_access', cloudList);
              list = DB.adminAccess.all();
              match = list.find(a => (a.email || '').trim().toLowerCase() === email && a.status === 'Active');
            }
          }
        } catch(e) {
          console.warn('[AdminAuth] Cloud zenvy_store admin_access check:', e);
        }
      }

      // 4. Real-Time Cloud Check: Check live Firestore 'admins' collection
      if (!match && typeof firebase !== 'undefined' && firebase.firestore) {
        try {
          const adminDoc = await firebase.firestore().collection('admins').doc(email).get();
          if (adminDoc.exists && adminDoc.data()?.active !== false) {
            const admData = adminDoc.data();
            match = {
              email,
              name: admData.name || user.displayName || email,
              role: admData.role || 'Admin',
              status: 'Active'
            };
            // Add to local adminAccess list so local cache remains in sync
            const currentList = DB.adminAccess.all();
            if (!currentList.some(a => (a.email || '').trim().toLowerCase() === email)) {
              currentList.push({
                id: 'adm_' + Date.now(),
                email,
                name: match.name,
                role: match.role,
                status: 'Active',
                addedAt: new Date().toISOString(),
                addedBy: admData.addedBy || 'Firestore'
              });
              Store.set('admin_access', currentList);
            }
          }
        } catch(e) {
          console.warn('[AdminAuth] Cloud admins collection check:', e);
        }
      }

      // 5. If authorized in either local or cloud whitelist -> Grant Admin Session!
      if (match) {
        sessionStorage.setItem('zenvy_admin_session', '1');
        sessionStorage.setItem('zenvy_admin_user', JSON.stringify({
          email,
          name: user.displayName || match.name || email,
          photo: user.photoURL || '',
          role: match.role || 'Admin'
        }));
        DB.log(`Admin ${email} (${match.role || 'Admin'}) logged in via Google Auth`);
        return { success: true };
      }

      // 6. Strict rejection if NOT on the whitelist
      return {
        success: false,
        error: `Access Denied: ${email} is not authorized. Only administrators added from Admin Settings → Admin Team can access the Admin Suite.`
      };
    },
    getCurrentUser() {
      try {
        return JSON.parse(sessionStorage.getItem('zenvy_admin_user') || 'null');
      } catch(e) { return null; }
    },
    logout() {
      sessionStorage.removeItem('zenvy_admin_session');
      sessionStorage.removeItem('zenvy_admin_user');
      try {
        if (typeof firebase !== 'undefined' && firebase.auth) {
          firebase.auth().signOut();
        }
      } catch(e){}
      DB.log('Admin logged out');
    },
    isLoggedIn() { return sessionStorage.getItem('zenvy_admin_session') === '1'; },
    changePassword(newPw) {
      if (!newPw || newPw.length < 8) {
        return { success: false, error: 'Password must be at least 8 characters.' };
      }
      Store.setObj('adminAuth', { password: newPw, updatedAt: Store.now() });
      // SECURITY: Never sync the password to Firestore (it is a public collection)
      DB.log('Admin password changed');
      return { success: true };
    }
  },

  // ── Shorthand log ──
  log(msg) {
    try {
      const items = Store.get('activityLog') || [];
      items.unshift({ id: Store.genId(), action: msg, admin: 'Admin', date: Store.now() });
      Store.set('activityLog', items.slice(0, 1000));
    } catch(e){}
  },

  // ── Analytics ──
  analytics: {
    revenueByDay(days = 30) {
      const orders = DB.orders.all().filter(o => o.paymentStatus === 'PAID');
      const map = {};
      for (let i = days - 1; i >= 0; i--) {
        const d = new Date(); d.setDate(d.getDate() - i);
        const key = d.toISOString().split('T')[0];
        map[key] = 0;
      }
      orders.forEach(o => {
        const key = o.createdAt.split('T')[0];
        if (map[key] !== undefined) map[key] += o.totalAmount;
      });
      return map;
    },
    ordersByDay(days = 30) {
      const orders = DB.orders.all();
      const map = {};
      for (let i = days - 1; i >= 0; i--) {
        const d = new Date(); d.setDate(d.getDate() - i);
        const key = d.toISOString().split('T')[0];
        map[key] = 0;
      }
      orders.forEach(o => {
        const key = o.createdAt.split('T')[0];
        if (map[key] !== undefined) map[key]++;
      });
      return map;
    },
    topProducts(n = 5) {
      const counts = {};
      DB.orders.all().forEach(o => {
        (o.items||[]).forEach(i => {
          counts[i.productName] = (counts[i.productName] || 0) + i.quantity;
        });
      });
      return Object.entries(counts).sort((a,b) => b[1]-a[1]).slice(0, n).map(([name,qty]) => ({ name, qty }));
    }
  },

  // ── Model Showcase & Testimonials ──
  modelShowcase: {
    defaultItems: [
      {
        id: 'model_1',
        name: 'Rahim Chowdhury',
        designation: 'Dhaka Premier League Midfielder',
        quote: 'The AeroKnit weave feels weightless during 90 minutes on the pitch. The customization precision on the player name and UCL starball badge is unmatched in Bangladesh.',
        src: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=900&q=80',
        jerseyName: 'AeroKnit Pro Match Kit',
        isActive: true,
        displayOrder: 1
      },
      {
        id: 'model_2',
        name: 'Tariqul Islam',
        designation: 'National League Striker',
        quote: 'Wearing the ZENVY Pro Elite kit for all our tournament matches. The sweat-wicking airflow keeps me cool, and the custom squad numbering never peels or cracks.',
        src: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=900&q=80',
        jerseyName: 'Crimson Velocity Edition',
        isActive: true,
        displayOrder: 2
      },
      {
        id: 'model_3',
        name: 'Shahriar Ahmed',
        designation: 'Semi-Pro Athlete & Brand Ambassador',
        quote: 'ZENVY represents the new benchmark for authentic sportswear. The fabric elasticity, tailored athletic slim-fit cut, and delivery speed across Dhaka are sensational.',
        src: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=900&q=80',
        jerseyName: 'Elite White Striker Kit',
        isActive: true,
        displayOrder: 3
      },
      {
        id: 'model_4',
        name: 'Arifur Rahman',
        designation: 'CrossFit Coach & Footballer',
        quote: 'From gym training sessions to weekend league games, the jersey holds its shape and color after dozens of washes. Truly an elite kit.',
        src: 'https://images.unsplash.com/photo-1511886929837-354d827aae26?w=900&q=80',
        jerseyName: 'All-Weather Training Tee',
        isActive: true,
        displayOrder: 4
      }
    ],
    all() {
      let items = Store.get('modelShowcase', null);
      if (!items || !Array.isArray(items) || items.length === 0) {
        Store.set('modelShowcase', this.defaultItems);
        return this.defaultItems;
      }
      // Upgrade any old placeholder images to pro athlete portraits
      let changed = false;
      items = items.map(m => {
        if (!m.src || m.src.includes('photo-1574629810360-7efbbe195018')) {
          m.src = 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=900&q=80';
          changed = true;
        }
        return m;
      });
      if (changed) Store.set('modelShowcase', items);
      return items;
    },
    active() {
      return this.all().filter(m => m.isActive !== false);
    },
    byId(id) {
      return this.all().find(m => m.id === id);
    },
    save(items) {
      Store.set('modelShowcase', items);
      if (window.ZenvyFirebase && window.ZenvyFirebase.push) {
        window.ZenvyFirebase.push('modelShowcase', items);
      }
      DB.log('Model showcase updated');
      return items;
    },
    create(data) {
      const items = this.all();
      const item = {
        id: 'model_' + Date.now(),
        name: data.name || 'Athlete Model',
        designation: data.designation || 'ZENVY Model',
        quote: data.quote || 'Elite athletic performance wear.',
        src: data.src || 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=900&q=80',
        jerseyName: data.jerseyName || 'Match Jersey',
        isActive: data.isActive !== false,
        displayOrder: parseInt(data.displayOrder) || (items.length + 1),
        createdAt: Store.now()
      };
      items.push(item);
      this.save(items);
      return item;
    },
    update(id, data) {
      const items = this.all().map(m => m.id === id ? { ...m, ...data, updatedAt: Store.now() } : m);
      this.save(items);
      return items.find(m => m.id === id);
    },
    delete(id) {
      const items = this.all().filter(m => m.id !== id);
      this.save(items);
      return true;
    },
    reset() {
      this.save(this.defaultItems);
      return this.defaultItems;
    }
  },

  // ── Export Helpers ──
  export: {
    downloadCSV(content, filename) {
      const blob = new Blob([content], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = filename; a.click();
      URL.revokeObjectURL(url);
    }
  }
};

// ── Safe Init & Catalog Preorder Sanity Self-Heal ──
try {
  let existingProds = Store.get('products');
  if (existingProds === null) {
    Store.set('products', []);
  } else if (Array.isArray(existingProds) && existingProds.length > 0) {
    let touched = false;
    existingProds.forEach(p => {
      if (p && p.isPreorder) {
        const hasPrice = typeof p.preorderPrice === 'number' && p.preorderPrice > 0;
        const isOpen = p.preorderStatus === 'OPEN' || p.preorderStatus === 'CLOSING_SOON';
        if (!hasPrice && !isOpen) {
          p.isPreorder = false;
          touched = true;
        }
      }
    });
    if (touched) {
      localStorage.setItem(`${DB_VERSION}_products`, JSON.stringify(existingProds));
    }
  }
} catch(e){}

// Expose globally on window for all views, modals, and integrations
if (typeof window !== 'undefined') {
  window.DB = DB;
  window.Store = Store;
}
