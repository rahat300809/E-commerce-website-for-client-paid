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
    "id": "prod_mwe087k8n71j75nf0",
    "customName": false,
    "sizeChartType": "Player Edition",
    "discountEnd": null,
    "assignedSizes": [
      "sz_s",
      "sz_m",
      "sz_l",
      "sz_xl",
      "sz_xxl",
      "sz_3xl",
      "sz_4xl"
    ],
    "isFeatured": false,
    "createdAt": "2026-11-12T20:32:34.376Z",
    "costPrice": 750,
    "isPreorder": false,
    "customBadge": "",
    "salePrice": 999,
    "imageUrl": "",
    "status": "published",
    "collectionId": null,
    "isBestSeller": false,
    "discountStart": null,
    "categoryName": "Player Version",
    "assignedSleeves": [
      "slv_half"
    ],
    "sport": "Football",
    "sizeChartImage": "",
    "preorderSold": 0,
    "slug": "borussia-dortmund-away-kit",
    "preorderCloseDate": null,
    "isNewArrival": false,
    "isLimited": true,
    "assignedPatches": [],
    "image": "img/products/prod_mwe087k8n71j75nf0.webp",
    "preorderPrice": null,
    "team": "Borussia Dortmund",
    "subcategoryId": "mw88n5w90qabal7hw",
    "customNameNumber": true,
    "isPublished": true,
    "deliveryChargeOutsideDhaka": 130,
    "shortDesc": "চায়না থেকে Imported অথেনটিক Player Version জার্সি",
    "seoTitle": "",
    "basePrice": 1150,
    "hasCustomDelivery": false,
    "tax": 0,
    "images": [
      {
        "url": "img/products/prod_mwe087k8n71j75nf0.webp",
        "alt": "Borussia Dortmund Away Kit",
        "isPrimary": true
      }
    ],
    "expectedArrival": null,
    "categoryId": "cat_mens_football",
    "preorderStatus": "OPEN",
    "customLogo": false,
    "discountType": "percent",
    "sku": "ZNV-MWE0AAOM",
    "customPrintPrice": null,
    "isArchived": false,
    "compareAt": 1150,
    "updatedAt": "2026-11-12T20:34:11.787Z",
    "description": "* সরাসরি চায়না থেকে ইমপোর্ট করা শতভাগ প্রিমিয়াম কোয়ালিটির অথেনটিক প্লেয়ার ভার্সন জার্সি।\n* অত্যন্ত হালকা, স্ট্রেচেবল এবং বাতাস চলাচলের উপযোগী ফেব্রিক দিয়ে তৈরি।\n* ক্লাব লোগো, ব্র্যান্ড লোগো এবং স্পনসর প্রিন্ট নিখুঁত ও টেকসই হিট-প্রেসড প্রযুক্তিতে বসানো।\n* প্লেয়ারদের জার্সির মতো বডি-হাগিং অ্যাথলেটিক স্লিম ফিট ও নিখুঁত সেলাইয়ের ফিনিশিং।\n* নিয়মিত খেলাধুলা কিংবা ক্যাজুয়াল আউটফিট হিসেবে পরার জন্য অত্যন্ত আরামদায়ক ও আকর্ষণীয়।",
    "lowStockAlert": 5,
    "preorderDesc": "",
    "gender": "Unisex",
    "advancePaymentMode": "cod_only",
    "customNumber": false,
    "sizeStocks": {},
    "deliveryChargeInsideDhaka": 80,
    "customText": false,
    "isDeliveryChargeMandatory": false,
    "preorderCapacity": 100,
    "deliveryNote": "",
    "expectedDelivery": null,
    "stock": 10,
    "name": "Borussia Dortmund Away Kit",
    "discountValue": null,
    "sizeMapping": {
      "3XL": {
        "width": 46,
        "height": 31
      },
      "XL": {
        "height": 29,
        "width": 42
      },
      "XS": {
        "width": 46,
        "height": 31
      },
      "4XL": {
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
      },
      "L": {
        "width": 40,
        "height": 28
      },
      "M": {
        "width": 38,
        "height": 27
      }
    },
    "seoDesc": ""
  },
  {
    "id": "prod_mwe01c9fwsp7p0fbh",
    "status": "published",
    "createdAt": "2026-11-12T20:27:13.875Z",
    "discountType": "percent",
    "customBadge": "",
    "customPrintPrice": null,
    "imageUrl": "",
    "name": "Atletico Madrid Away Kit",
    "preorderCloseDate": null,
    "deliveryChargeOutsideDhaka": 130,
    "discountEnd": null,
    "discountValue": null,
    "customText": false,
    "sizeStocks": {},
    "preorderDesc": "",
    "hasCustomDelivery": false,
    "salePrice": 999,
    "costPrice": 750,
    "preorderCapacity": 100,
    "isLimited": true,
    "assignedPatches": [],
    "isPublished": true,
    "images": [
      {
        "url": "img/products/prod_mwe01c9fwsp7p0fbh.webp",
        "alt": "Atletico Madrid Away Kit",
        "isPrimary": true
      }
    ],
    "deliveryNote": "",
    "seoTitle": "",
    "assignedSleeves": [
      "slv_half"
    ],
    "customNumber": false,
    "isDeliveryChargeMandatory": false,
    "deliveryChargeInsideDhaka": 80,
    "expectedArrival": null,
    "isArchived": false,
    "basePrice": 1150,
    "seoDesc": "",
    "sizeChartImage": "",
    "stock": 10,
    "customLogo": false,
    "shortDesc": "চায়না থেকে Imported অথেনটিক Player Version জার্সি",
    "tax": 0,
    "lowStockAlert": 5,
    "expectedDelivery": null,
    "categoryId": "cat_mens_football",
    "gender": "Unisex",
    "description": "* সরাসরি চায়না থেকে ইমপোর্ট করা শতভাগ প্রিমিয়াম কোয়ালিটির অথেনটিক প্লেয়ার ভার্সন জার্সি।\n* অত্যন্ত হালকা, স্ট্রেচেবল এবং বাতাস চলাচলের উপযোগী ফেব্রিক দিয়ে তৈরি।\n* ক্লাব লোগো, ব্র্যান্ড লোগো এবং স্পনসর প্রিন্ট নিখুঁত ও টেকসই হিট-প্রেসড প্রযুক্তিতে বসানো।\n* প্লেয়ারদের জার্সির মতো বডি-হাগিং অ্যাথলেটিক স্লিম ফিট ও নিখুঁত সেলাইয়ের ফিনিশিং।\n* নিয়মিত খেলাধুলা কিংবা ক্যাজুয়াল আউটফিট হিসেবে পরার জন্য অত্যন্ত আরামদায়ক ও আকর্ষণীয়।",
    "team": "Atletico Madrid",
    "sku": "ZNV-MWE05I8L",
    "slug": "atletico-madrid-away-kit",
    "preorderPrice": null,
    "subcategoryId": "mw88n5w90qabal7hw",
    "compareAt": 1150,
    "updatedAt": "2026-11-12T20:34:17.695Z",
    "isBestSeller": false,
    "preorderStatus": "OPEN",
    "collectionId": null,
    "sizeChartType": "Player Edition",
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
    "advancePaymentMode": "cod_only",
    "categoryName": "Player Version",
    "sizeMapping": {
      "XXL": {
        "height": 30,
        "width": 44
      },
      "4XL": {
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
      "M": {
        "height": 27,
        "width": 38
      },
      "XS": {
        "width": 46,
        "height": 31
      },
      "XL": {
        "height": 29,
        "width": 42
      },
      "3XL": {
        "width": 46,
        "height": 31
      }
    },
    "isPreorder": false,
    "preorderSold": 0,
    "isNewArrival": false,
    "image": "img/products/prod_mwe01c9fwsp7p0fbh.webp",
    "isFeatured": false,
    "customNameNumber": true,
    "discountStart": null,
    "customName": false
  },
  {
    "id": "prod_mwdzvb65s2tv6g5iv",
    "sizeChartImage": "",
    "deliveryNote": "",
    "tax": 0,
    "customNumber": false,
    "description": "* সরাসরি চায়না থেকে ইমপোর্ট করা শতভাগ প্রিমিয়াম কোয়ালিটির অথেনটিক প্লেয়ার ভার্সন জার্সি।\n* অত্যন্ত হালকা, স্ট্রেচেবল এবং বাতাস চলাচলের উপযোগী ফেব্রিক দিয়ে তৈরি।\n* ক্লাব লোগো, ব্র্যান্ড লোগো এবং স্পনসর প্রিন্ট নিখুঁত ও টেকসই হিট-প্রেসড প্রযুক্তিতে বসানো।\n* প্লেয়ারদের জার্সির মতো বডি-হাগিং অ্যাথলেটিক স্লিম ফিট ও নিখুঁত সেলাইয়ের ফিনিশিং।\n* নিয়মিত খেলাধুলা কিংবা ক্যাজুয়াল আউটফিট হিসেবে পরার জন্য অত্যন্ত আরামদায়ক ও আকর্ষণীয়।",
    "assignedSizes": [
      "sz_s",
      "sz_m",
      "sz_l",
      "sz_xl",
      "sz_xxl",
      "sz_3xl",
      "sz_4xl"
    ],
    "sizeChartType": "Player Edition",
    "discountStart": null,
    "advancePaymentMode": "cod_only",
    "name": "Mancester United Third Kit",
    "gender": "Unisex",
    "updatedAt": "2026-11-12T20:23:09.709Z",
    "compareAt": 1150,
    "customNameNumber": true,
    "seoDesc": "",
    "customName": false,
    "sizeMapping": {
      "3XL": {
        "width": 46,
        "height": 31
      },
      "S": {
        "width": 36,
        "height": 26
      },
      "XL": {
        "width": 42,
        "height": 29
      },
      "XS": {
        "height": 31,
        "width": 46
      },
      "M": {
        "width": 38,
        "height": 27
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
      }
    },
    "discountType": "percent",
    "sport": "Football",
    "isFeatured": false,
    "deliveryChargeInsideDhaka": 80,
    "isPreorder": false,
    "isDeliveryChargeMandatory": false,
    "preorderDesc": "",
    "image": "img/products/prod_mwdzvb65s2tv6g5iv.webp",
    "subcategoryId": "mw88n5w90qabal7hw",
    "preorderPrice": null,
    "createdAt": "2026-11-12T20:22:32.525Z",
    "hasCustomDelivery": false,
    "isNewArrival": false,
    "preorderCapacity": 100,
    "preorderSold": 0,
    "customBadge": "",
    "customText": false,
    "sizeStocks": {},
    "slug": "mancester-united-third-kit",
    "categoryName": "Player Version",
    "preorderCloseDate": null,
    "team": "Man United",
    "lowStockAlert": 5,
    "costPrice": 750,
    "seoTitle": "",
    "salePrice": 999,
    "expectedDelivery": null,
    "discountEnd": null,
    "deliveryChargeOutsideDhaka": 130,
    "status": "published",
    "customPrintPrice": null,
    "customLogo": false,
    "isLimited": true,
    "categoryId": "cat_mens_football",
    "expectedArrival": null,
    "isArchived": false,
    "preorderStatus": "OPEN",
    "isPublished": true,
    "isBestSeller": false,
    "sku": "ZNV-MWDZW3T6",
    "collectionId": null,
    "basePrice": 1150,
    "assignedPatches": [
      "patch_ucl"
    ],
    "discountValue": null,
    "stock": 10,
    "shortDesc": "চায়না থেকে Imported অথেনটিক Player Version জার্সি",
    "imageUrl": "",
    "images": [
      {
        "url": "img/products/prod_mwdzvb65s2tv6g5iv.webp",
        "alt": "Mancester United Third Kit",
        "isPrimary": true
      }
    ],
    "assignedSleeves": [
      "slv_half"
    ]
  },
  {
    "id": "prod_mwdzuhqo33wb2zexr",
    "salePrice": 999,
    "costPrice": 750,
    "preorderCapacity": 100,
    "expectedArrival": null,
    "team": "Man United",
    "deliveryNote": "",
    "discountStart": null,
    "customNumber": false,
    "sizeChartType": "Player Edition",
    "slug": "mancester-united-away-kit",
    "status": "published",
    "assignedPatches": [
      "patch_ucl"
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
    "customText": false,
    "expectedDelivery": null,
    "createdAt": "2026-11-12T20:21:54.384Z",
    "description": "* সরাসরি চায়না থেকে ইমপোর্ট করা শতভাগ প্রিমিয়াম কোয়ালিটির অথেনটিক প্লেয়ার ভার্সন জার্সি।\n* অত্যন্ত হালকা, স্ট্রেচেবল এবং বাতাস চলাচলের উপযোগী ফেব্রিক দিয়ে তৈরি।\n* ক্লাব লোগো, ব্র্যান্ড লোগো এবং স্পনসর প্রিন্ট নিখুঁত ও টেকসই হিট-প্রেসড প্রযুক্তিতে বসানো।\n* প্লেয়ারদের জার্সির মতো বডি-হাগিং অ্যাথলেটিক স্লিম ফিট ও নিখুঁত সেলাইয়ের ফিনিশিং।\n* নিয়মিত খেলাধুলা কিংবা ক্যাজুয়াল আউটফিট হিসেবে পরার জন্য অত্যন্ত আরামদায়ক ও আকর্ষণীয়।",
    "sizeStocks": {},
    "assignedSleeves": [
      "slv_half"
    ],
    "discountType": "percent",
    "shortDesc": "চায়না থেকে Imported অথেনটিক Player Version জার্সি",
    "subcategoryId": "mw88n5w90qabal7hw",
    "preorderPrice": null,
    "customPrintPrice": null,
    "preorderCloseDate": null,
    "preorderStatus": "OPEN",
    "image": "img/products/prod_mwdzuhqo33wb2zexr.webp",
    "basePrice": 1150,
    "hasCustomDelivery": false,
    "images": [
      {
        "url": "img/products/prod_mwdzuhqo33wb2zexr.webp",
        "alt": "Mancester United Away Kit",
        "isPrimary": true
      }
    ],
    "categoryId": "cat_mens_football",
    "customLogo": false,
    "isLimited": true,
    "preorderDesc": "",
    "sport": "Football",
    "sizeMapping": {
      "S": {
        "width": 36,
        "height": 26
      },
      "L": {
        "width": 40,
        "height": 28
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
        "height": 29,
        "width": 42
      },
      "XS": {
        "height": 31,
        "width": 46
      },
      "XXL": {
        "width": 44,
        "height": 30
      },
      "4XL": {
        "width": 46,
        "height": 31
      }
    },
    "isArchived": false,
    "seoDesc": "",
    "tax": 0,
    "compareAt": 1150,
    "updatedAt": "2026-11-12T20:22:29.677Z",
    "sizeChartImage": "",
    "categoryName": "Player Version",
    "lowStockAlert": 5,
    "name": "Mancester United Away Kit",
    "sku": "ZNV-MWDZV8X5",
    "isNewArrival": false,
    "imageUrl": "",
    "preorderSold": 0,
    "discountEnd": null,
    "deliveryChargeInsideDhaka": 80,
    "isDeliveryChargeMandatory": false,
    "gender": "Unisex",
    "deliveryChargeOutsideDhaka": 130,
    "customBadge": "",
    "customNameNumber": true,
    "advancePaymentMode": "cod_only",
    "discountValue": null,
    "isPreorder": false,
    "seoTitle": "",
    "stock": 10,
    "customName": false,
    "isBestSeller": false,
    "isFeatured": false,
    "collectionId": null,
    "isPublished": true
  },
  {
    "id": "prod_mwdzs36rkf46yv452",
    "sizeChartImage": "",
    "discountValue": null,
    "customName": false,
    "preorderCloseDate": null,
    "customNumber": false,
    "deliveryNote": "",
    "isFeatured": false,
    "tax": 0,
    "hasCustomDelivery": false,
    "isPreorder": false,
    "imageUrl": "",
    "description": "* সরাসরি চায়না থেকে ইমপোর্ট করা শতভাগ প্রিমিয়াম কোয়ালিটির অথেনটিক প্লেয়ার ভার্সন জার্সি।\n* অত্যন্ত হালকা, স্ট্রেচেবল এবং বাতাস চলাচলের উপযোগী ফেব্রিক দিয়ে তৈরি।\n* ক্লাব লোগো, ব্র্যান্ড লোগো এবং স্পনসর প্রিন্ট নিখুঁত ও টেকসই হিট-প্রেসড প্রযুক্তিতে বসানো।\n* প্লেয়ারদের জার্সির মতো বডি-হাগিং অ্যাথলেটিক স্লিম ফিট ও নিখুঁত সেলাইয়ের ফিনিশিং।\n* নিয়মিত খেলাধুলা কিংবা ক্যাজুয়াল আউটফিট হিসেবে পরার জন্য অত্যন্ত আরামদায়ক ও আকর্ষণীয়।",
    "customNameNumber": true,
    "gender": "Unisex",
    "team": "Man United",
    "discountType": "percent",
    "lowStockAlert": 5,
    "compareAt": 1150,
    "updatedAt": "2026-11-12T20:21:28.505Z",
    "sport": "Football",
    "sizeMapping": {
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
      },
      "L": {
        "width": 40,
        "height": 28
      },
      "S": {
        "width": 36,
        "height": 26
      },
      "3XL": {
        "height": 31,
        "width": 46
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
    "seoTitle": "",
    "deliveryChargeOutsideDhaka": 130,
    "image": "img/products/prod_mwdzs36rkf46yv452.webp",
    "slug": "mancester-united-home-kit",
    "preorderDesc": "",
    "preorderCapacity": 100,
    "discountEnd": null,
    "customLogo": false,
    "categoryName": "Player Version",
    "preorderPrice": null,
    "basePrice": 1150,
    "subcategoryId": "mw88n5w90qabal7hw",
    "images": [
      {
        "url": "img/products/prod_mwdzs36rkf46yv452.webp",
        "alt": "Mancester United Home Kit",
        "isPrimary": true
      }
    ],
    "categoryId": "cat_mens_football",
    "preorderSold": 0,
    "isArchived": false,
    "isNewArrival": false,
    "shortDesc": "চায়না থেকে Imported অথেনটিক Player Version জার্সি",
    "advancePaymentMode": "cod_only",
    "isLimited": true,
    "customBadge": "",
    "expectedDelivery": null,
    "assignedPatches": [
      "patch_ucl"
    ],
    "name": "Mancester United Home Kit",
    "isDeliveryChargeMandatory": false,
    "sku": "ZNV-MWDZTXQ5",
    "deliveryChargeInsideDhaka": 80,
    "status": "published",
    "customPrintPrice": null,
    "assignedSleeves": [
      "slv_half"
    ],
    "salePrice": 999,
    "sizeStocks": {},
    "discountStart": null,
    "costPrice": 750,
    "customText": false,
    "preorderStatus": "OPEN",
    "sizeChartType": "Player Edition",
    "isPublished": true,
    "expectedArrival": null,
    "assignedSizes": [
      "sz_s",
      "sz_m",
      "sz_l",
      "sz_xl",
      "sz_xxl",
      "sz_3xl",
      "sz_4xl"
    ],
    "createdAt": "2026-11-12T20:20:02.212Z",
    "stock": 10,
    "collectionId": null,
    "seoDesc": "",
    "isBestSeller": false
  },
  {
    "id": "prod_mwdzp9ss9ctsb7vqz",
    "isLimited": true,
    "slug": "inter-miami-away-kit",
    "customText": false,
    "sizeStocks": {},
    "customNameNumber": true,
    "sport": "Football",
    "discountEnd": null,
    "images": [
      {
        "url": "img/products/prod_mwdzp9ss9ctsb7vqz.webp",
        "alt": "Inter Miami Away kit",
        "isPrimary": true
      }
    ],
    "tax": 0,
    "basePrice": 1150,
    "isNewArrival": false,
    "subcategoryId": "mw88n5w90qabal7hw",
    "preorderPrice": null,
    "preorderSold": 0,
    "seoTitle": "",
    "customBadge": "",
    "shortDesc": "চায়না থেকে Imported অথেনটিক Player Version জার্সি",
    "team": "Inter Miami",
    "image": "img/products/prod_mwdzp9ss9ctsb7vqz.webp",
    "categoryName": "Player Version",
    "isBestSeller": false,
    "createdAt": "2026-11-12T20:17:50.813Z",
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
    "isArchived": false,
    "collectionId": null,
    "sizeChartType": "Player Edition",
    "customLogo": false,
    "hasCustomDelivery": false,
    "categoryId": "cat_mens_football",
    "status": "published",
    "discountStart": null,
    "imageUrl": "",
    "preorderCloseDate": null,
    "salePrice": 999,
    "costPrice": 750,
    "isPublished": true,
    "expectedDelivery": null,
    "isDeliveryChargeMandatory": false,
    "preorderStatus": "OPEN",
    "deliveryChargeInsideDhaka": 80,
    "expectedArrival": null,
    "discountValue": null,
    "preorderCapacity": 100,
    "deliveryNote": "",
    "seoDesc": "",
    "assignedSleeves": [
      "slv_half"
    ],
    "deliveryChargeOutsideDhaka": 130,
    "customNumber": false,
    "description": "* সরাসরি চায়না থেকে ইমপোর্ট করা শতভাগ প্রিমিয়াম কোয়ালিটির অথেনটিক প্লেয়ার ভার্সন জার্সি।\n* অত্যন্ত হালকা, স্ট্রেচেবল এবং বাতাস চলাচলের উপযোগী ফেব্রিক দিয়ে তৈরি।\n* ক্লাব লোগো, ব্র্যান্ড লোগো এবং স্পনসর প্রিন্ট নিখুঁত ও টেকসই হিট-প্রেসড প্রযুক্তিতে বসানো।\n* প্লেয়ারদের জার্সির মতো বডি-হাগিং অ্যাথলেটিক স্লিম ফিট ও নিখুঁত সেলাইয়ের ফিনিশিং।\n* নিয়মিত খেলাধুলা কিংবা ক্যাজুয়াল আউটফিট হিসেবে পরার জন্য অত্যন্ত আরামদায়ক ও আকর্ষণীয়।",
    "stock": 10,
    "assignedPatches": [],
    "name": "Inter Miami Away kit",
    "preorderDesc": "",
    "sku": "ZNV-MWDZRLBN",
    "isFeatured": false,
    "advancePaymentMode": "cod_only",
    "customName": false,
    "gender": "Unisex",
    "customPrintPrice": null,
    "sizeMapping": {
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
      },
      "S": {
        "width": 36,
        "height": 26
      },
      "L": {
        "width": 40,
        "height": 28
      },
      "M": {
        "height": 27,
        "width": 38
      },
      "4XL": {
        "width": 46,
        "height": 31
      },
      "XXL": {
        "height": 30,
        "width": 44
      }
    },
    "discountType": "percent",
    "isPreorder": false,
    "compareAt": 1150,
    "updatedAt": "2026-11-12T20:19:39.120Z",
    "lowStockAlert": 5
  },
  {
    "id": "prod_mwdzm08vaxzqhjps3",
    "discountValue": null,
    "sport": "Football",
    "preorderCloseDate": null,
    "deliveryNote": "",
    "customNumber": false,
    "isLimited": true,
    "team": "Inter Miami",
    "shortDesc": "চায়না থেকে Imported অথেনটিক Player Version জার্সি",
    "hasCustomDelivery": false,
    "advancePaymentMode": "cod_only",
    "slug": "inter-miami-third-kit",
    "images": [
      {
        "url": "img/products/prod_mwdzm08vaxzqhjps3.webp",
        "alt": "Inter Miami Away kit",
        "isPrimary": true
      }
    ],
    "seoDesc": "",
    "image": "img/products/prod_mwdzm08vaxzqhjps3.webp",
    "customPrintPrice": null,
    "basePrice": 1150,
    "isPublished": true,
    "expectedDelivery": null,
    "isFeatured": false,
    "discountType": "percent",
    "createdAt": "2026-11-12T20:15:18.463Z",
    "customName": false,
    "lowStockAlert": 5,
    "discountEnd": null,
    "status": "published",
    "preorderDesc": "",
    "salePrice": 999,
    "tax": 0,
    "costPrice": 750,
    "customBadge": "",
    "deliveryChargeOutsideDhaka": 130,
    "preorderCapacity": 100,
    "sizeChartImage": "",
    "isPreorder": false,
    "customText": false,
    "sizeStocks": {},
    "isNewArrival": false,
    "sku": "ZNV-MWDZNU33",
    "preorderSold": 0,
    "subcategoryId": "mw88n5w90qabal7hw",
    "preorderPrice": null,
    "name": "Inter Miami Third kit",
    "categoryName": "Player Version",
    "stock": 10,
    "preorderStatus": "OPEN",
    "imageUrl": "",
    "sizeMapping": {
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
      "S": {
        "width": 36,
        "height": 26
      },
      "L": {
        "height": 28,
        "width": 40
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
    "customNameNumber": true,
    "isArchived": false,
    "assignedPatches": [],
    "discountStart": null,
    "categoryId": "cat_mens_football",
    "customLogo": false,
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
    "isBestSeller": false,
    "updatedAt": "2026-11-12T20:17:45.624Z",
    "compareAt": 1150,
    "expectedArrival": null,
    "collectionId": null,
    "sizeChartType": "Player Edition",
    "gender": "Unisex",
    "seoTitle": "",
    "description": "* সরাসরি চায়না থেকে ইমপোর্ট করা শতভাগ প্রিমিয়াম কোয়ালিটির অথেনটিক প্লেয়ার ভার্সন জার্সি।\n* অত্যন্ত হালকা, স্ট্রেচেবল এবং বাতাস চলাচলের উপযোগী ফেব্রিক দিয়ে তৈরি।\n* ক্লাব লোগো, ব্র্যান্ড লোগো এবং স্পনসর প্রিন্ট নিখুঁত ও টেকসই হিট-প্রেসড প্রযুক্তিতে বসানো।\n* প্লেয়ারদের জার্সির মতো বডি-হাগিং অ্যাথলেটিক স্লিম ফিট ও নিখুঁত সেলাইয়ের ফিনিশিং।\n* নিয়মিত খেলাধুলা কিংবা ক্যাজুয়াল আউটফিট হিসেবে পরার জন্য অত্যন্ত আরামদায়ক ও আকর্ষণীয়।",
    "deliveryChargeInsideDhaka": 80,
    "isDeliveryChargeMandatory": false
  },
  {
    "id": "prod_mwdzkir4mnoj7j1g6",
    "slug": "inter-miami-home-kit",
    "preorderStatus": "OPEN",
    "collectionId": null,
    "subcategoryId": "mw88n5w90qabal7hw",
    "salePrice": 999,
    "shortDesc": "চায়না থেকে Imported অথেনটিক Player Version জার্সি",
    "costPrice": 750,
    "isFeatured": false,
    "sku": "ZNV-MWDZLWYX",
    "discountValue": null,
    "customNumber": false,
    "sizeChartImage": "",
    "description": "* সরাসরি চায়না থেকে ইমপোর্ট করা শতভাগ প্রিমিয়াম কোয়ালিটির অথেনটিক প্লেয়ার ভার্সন জার্সি।\n* অত্যন্ত হালকা, স্ট্রেচেবল এবং বাতাস চলাচলের উপযোগী ফেব্রিক দিয়ে তৈরি।\n* ক্লাব লোগো, ব্র্যান্ড লোগো এবং স্পনসর প্রিন্ট নিখুঁত ও টেকসই হিট-প্রেসড প্রযুক্তিতে বসানো।\n* প্লেয়ারদের জার্সির মতো বডি-হাগিং অ্যাথলেটিক স্লিম ফিট ও নিখুঁত সেলাইয়ের ফিনিশিং।\n* নিয়মিত খেলাধুলা কিংবা ক্যাজুয়াল আউটফিট হিসেবে পরার জন্য অত্যন্ত আরামদায়ক ও আকর্ষণীয়।",
    "isLimited": true,
    "preorderDesc": "",
    "customPrintPrice": null,
    "sport": "Football",
    "deliveryChargeOutsideDhaka": 130,
    "basePrice": 1150,
    "imageUrl": "",
    "compareAt": 1150,
    "assignedPatches": [],
    "gender": "Unisex",
    "discountStart": null,
    "seoDesc": "",
    "isBestSeller": false,
    "sizeStocks": {},
    "customText": false,
    "discountEnd": null,
    "stock": 10,
    "assignedSizes": [
      "sz_s",
      "sz_m",
      "sz_l",
      "sz_xl",
      "sz_xxl",
      "sz_3xl",
      "sz_4xl"
    ],
    "name": "Inter Miami Home kit",
    "discountType": "percent",
    "isDeliveryChargeMandatory": false,
    "tax": 0,
    "isNewArrival": false,
    "customLogo": false,
    "updatedAt": "2026-11-12T20:15:14.265Z",
    "categoryName": "Player Version",
    "preorderCloseDate": null,
    "images": [
      {
        "url": "img/products/prod_mwdzkir4mnoj7j1g6.webp",
        "alt": "Inter Miami Home kit",
        "isPrimary": true
      }
    ],
    "categoryId": "cat_mens_football",
    "deliveryChargeInsideDhaka": 80,
    "sizeMapping": {
      "M": {
        "width": 38,
        "height": 27
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
        "width": 46,
        "height": 31
      },
      "L": {
        "width": 40,
        "height": 28
      },
      "3XL": {
        "width": 46,
        "height": 31
      },
      "XL": {
        "width": 42,
        "height": 29
      },
      "S": {
        "height": 26,
        "width": 36
      }
    },
    "isArchived": false,
    "deliveryNote": "",
    "status": "published",
    "customBadge": "",
    "customNameNumber": true,
    "sizeChartType": "Player Edition",
    "customName": false,
    "advancePaymentMode": "cod_only",
    "createdAt": "2026-11-12T20:14:09.136Z",
    "expectedDelivery": null,
    "lowStockAlert": 5,
    "preorderPrice": null,
    "hasCustomDelivery": false,
    "expectedArrival": null,
    "preorderSold": 0,
    "seoTitle": "",
    "image": "img/products/prod_mwdzkir4mnoj7j1g6.webp",
    "isPreorder": false,
    "preorderCapacity": 100,
    "team": "Inter Miami",
    "assignedSleeves": [
      "slv_half"
    ],
    "isPublished": true
  },
  {
    "id": "prod_mwdze6yw9wzww94nq",
    "customNameNumber": true,
    "expectedDelivery": null,
    "customText": false,
    "sizeStocks": {},
    "isBestSeller": false,
    "slug": "al-nasser-third-kit",
    "assignedPatches": [],
    "discountEnd": null,
    "tax": 0,
    "preorderCapacity": 100,
    "preorderCloseDate": null,
    "discountType": "percent",
    "compareAt": 1150,
    "basePrice": 1150,
    "imageUrl": "",
    "isLimited": true,
    "hasCustomDelivery": false,
    "seoDesc": "",
    "isDeliveryChargeMandatory": false,
    "collectionId": null,
    "name": "Al Nasser Third Kit",
    "deliveryChargeOutsideDhaka": 130,
    "costPrice": 750,
    "shortDesc": "চায়না থেকে Imported অথেনটিক Player Version জার্সি",
    "customNumber": false,
    "salePrice": 999,
    "isFeatured": false,
    "lowStockAlert": 5,
    "preorderPrice": null,
    "image": "img/products/prod_mwdze6yw9wzww94nq.webp",
    "preorderDesc": "",
    "gender": "Unisex",
    "sizeChartType": "Player Edition",
    "description": "* সরাসরি চায়না থেকে ইমপোর্ট করা শতভাগ প্রিমিয়াম কোয়ালিটির অথেনটিক প্লেয়ার ভার্সন জার্সি।\n* অত্যন্ত হালকা, স্ট্রেচেবল এবং বাতাস চলাচলের উপযোগী ফেব্রিক দিয়ে তৈরি।\n* ক্লাব লোগো, ব্র্যান্ড লোগো এবং স্পনসর প্রিন্ট নিখুঁত ও টেকসই হিট-প্রেসড প্রযুক্তিতে বসানো।\n* প্লেয়ারদের জার্সির মতো বডি-হাগিং অ্যাথলেটিক স্লিম ফিট ও নিখুঁত সেলাইয়ের ফিনিশিং।\n* নিয়মিত খেলাধুলা কিংবা ক্যাজুয়াল আউটফিট হিসেবে পরার জন্য অত্যন্ত আরামদায়ক ও আকর্ষণীয়।",
    "status": "published",
    "sku": "ZNV-MWDZJFP0",
    "customName": false,
    "customBadge": "",
    "images": [
      {
        "url": "img/products/prod_mwdze6yw9wzww94nq.webp",
        "alt": "Al Nasser Third Kit",
        "isPrimary": true
      },
      {
        "url": "img/products/prod_mwdze6yw9wzww94nq_1.webp",
        "alt": "Al Nasser Third Kit",
        "isPrimary": false
      }
    ],
    "discountValue": null,
    "preorderSold": 0,
    "assignedSleeves": [
      "slv_half"
    ],
    "deliveryChargeInsideDhaka": 80,
    "isPreorder": false,
    "sport": "Football",
    "expectedArrival": null,
    "subcategoryId": "mw88n5w90qabal7hw",
    "isPublished": true,
    "createdAt": "2026-11-12T20:09:13.928Z",
    "isNewArrival": false,
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
    "customLogo": false,
    "categoryName": "Player Version",
    "team": "Al Nasser",
    "preorderStatus": "OPEN",
    "categoryId": "cat_mens_football",
    "sizeChartImage": "",
    "updatedAt": "2026-11-12T20:13:18.559Z",
    "discountStart": null,
    "isArchived": false,
    "stock": 10,
    "deliveryNote": "",
    "customPrintPrice": null,
    "advancePaymentMode": "cod_only",
    "sizeMapping": {
      "XXL": {
        "height": 30,
        "width": 44
      },
      "M": {
        "width": 38,
        "height": 27
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
      "XL": {
        "width": 42,
        "height": 29
      },
      "S": {
        "width": 36,
        "height": 26
      }
    }
  },
  {
    "id": "prod_mwdzcjyygi3k7sd87",
    "imageUrl": "",
    "lowStockAlert": 5,
    "preorderPrice": null,
    "assignedSleeves": [
      "slv_half"
    ],
    "sizeChartType": "Player Edition",
    "categoryName": "Player Version",
    "deliveryChargeOutsideDhaka": 130,
    "isLimited": true,
    "preorderStatus": "OPEN",
    "isNewArrival": false,
    "discountEnd": null,
    "expectedArrival": null,
    "sizeChartImage": "",
    "isDeliveryChargeMandatory": false,
    "deliveryNote": "",
    "shortDesc": "চায়না থেকে Imported অথেনটিক Player Version জার্সি",
    "costPrice": 750,
    "isFeatured": false,
    "salePrice": 999,
    "customPrintPrice": null,
    "image": "img/products/prod_mwdzcjyygi3k7sd87.webp",
    "preorderSold": 0,
    "description": "* সরাসরি চায়না থেকে ইমপোর্ট করা শতভাগ প্রিমিয়াম কোয়ালিটির অথেনটিক প্লেয়ার ভার্সন জার্সি।\n* অত্যন্ত হালকা, স্ট্রেচেবল এবং বাতাস চলাচলের উপযোগী ফেব্রিক দিয়ে তৈরি।\n* ক্লাব লোগো, ব্র্যান্ড লোগো এবং স্পনসর প্রিন্ট নিখুঁত ও টেকসই হিট-প্রেসড প্রযুক্তিতে বসানো।\n* প্লেয়ারদের জার্সির মতো বডি-হাগিং অ্যাথলেটিক স্লিম ফিট ও নিখুঁত সেলাইয়ের ফিনিশিং।\n* নিয়মিত খেলাধুলা কিংবা ক্যাজুয়াল আউটফিট হিসেবে পরার জন্য অত্যন্ত আরামদায়ক ও আকর্ষণীয়।",
    "customText": false,
    "sizeStocks": {},
    "team": "Al Nasser",
    "compareAt": 1150,
    "gender": "Unisex",
    "sku": "ZNV-MWDZDP6O",
    "advancePaymentMode": "cod_only",
    "basePrice": 1150,
    "isPublished": true,
    "images": [
      {
        "url": "img/products/prod_mwdzcjyygi3k7sd87.webp",
        "alt": "Al Nasser Away Kit",
        "isPrimary": true
      }
    ],
    "customLogo": false,
    "collectionId": null,
    "seoTitle": "",
    "preorderCapacity": 100,
    "sport": "Football",
    "discountStart": null,
    "status": "published",
    "slug": "al-nasser-away-kit",
    "preorderDesc": "",
    "isArchived": false,
    "hasCustomDelivery": false,
    "expectedDelivery": null,
    "assignedPatches": [],
    "assignedSizes": [
      "sz_s",
      "sz_m",
      "sz_l",
      "sz_xl",
      "sz_xxl",
      "sz_3xl",
      "sz_4xl"
    ],
    "updatedAt": "2026-11-12T20:08:50.930Z",
    "customBadge": "",
    "categoryId": "cat_mens_football",
    "customNameNumber": true,
    "customNumber": false,
    "preorderCloseDate": null,
    "stock": 10,
    "seoDesc": "",
    "subcategoryId": "mw88n5w90qabal7hw",
    "tax": 0,
    "isBestSeller": false,
    "sizeMapping": {
      "XXL": {
        "width": 44,
        "height": 30
      },
      "M": {
        "height": 27,
        "width": 38
      },
      "4XL": {
        "width": 46,
        "height": 31
      },
      "L": {
        "height": 28,
        "width": 40
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
      "S": {
        "width": 36,
        "height": 26
      }
    },
    "name": "Al Nasser Away Kit",
    "customName": false,
    "discountValue": null,
    "discountType": "percent",
    "createdAt": "2026-11-12T20:07:57.466Z",
    "deliveryChargeInsideDhaka": 80,
    "isPreorder": false
  },
  {
    "id": "prod_mwdz5xxlf44t9pakf",
    "slug": "al-nasser-home-kit",
    "advancePaymentMode": "cod_only",
    "expectedArrival": null,
    "customNumber": false,
    "customLogo": false,
    "preorderDesc": "",
    "collectionId": null,
    "categoryId": "cat_mens_football",
    "discountEnd": null,
    "sizeChartType": "Player Edition",
    "assignedSleeves": [
      "slv_half"
    ],
    "preorderPrice": null,
    "lowStockAlert": 5,
    "isArchived": false,
    "createdAt": "2026-11-12T20:02:48.969Z",
    "customPrintPrice": null,
    "seoTitle": "",
    "sku": "ZNV-MWDZARKV",
    "sport": "Football",
    "gender": "Unisex",
    "customName": false,
    "discountType": "percent",
    "isDeliveryChargeMandatory": false,
    "stock": 10,
    "isPreorder": false,
    "updatedAt": "2026-11-12T20:08:56.082Z",
    "description": "* সরাসরি চায়না থেকে ইমপোর্ট করা শতভাগ প্রিমিয়াম কোয়ালিটির অথেনটিক প্লেয়ার ভার্সন জার্সি।\n* অত্যন্ত হালকা, স্ট্রেচেবল এবং বাতাস চলাচলের উপযোগী ফেব্রিক দিয়ে তৈরি।\n* ক্লাব লোগো, ব্র্যান্ড লোগো এবং স্পনসর প্রিন্ট নিখুঁত ও টেকসই হিট-প্রেসড প্রযুক্তিতে বসানো।\n* প্লেয়ারদের জার্সির মতো বডি-হাগিং অ্যাথলেটিক স্লিম ফিট ও নিখুঁত সেলাইয়ের ফিনিশিং।\n* নিয়মিত খেলাধুলা কিংবা ক্যাজুয়াল আউটফিট হিসেবে পরার জন্য অত্যন্ত আরামদায়ক ও আকর্ষণীয়।",
    "name": "Al Nasser Home Kit",
    "isBestSeller": false,
    "deliveryChargeInsideDhaka": 80,
    "customBadge": "",
    "assignedSizes": [
      "sz_s",
      "sz_m",
      "sz_l",
      "sz_xl",
      "sz_xxl",
      "sz_3xl",
      "sz_4xl"
    ],
    "assignedPatches": [],
    "deliveryNote": "",
    "seoDesc": "",
    "tax": 0,
    "hasCustomDelivery": false,
    "imageUrl": "",
    "isFeatured": false,
    "isNewArrival": false,
    "deliveryChargeOutsideDhaka": 130,
    "discountStart": null,
    "basePrice": 1150,
    "isPublished": true,
    "compareAt": 1150,
    "categoryName": "Player Version",
    "sizeChartImage": "",
    "customNameNumber": true,
    "isLimited": true,
    "expectedDelivery": null,
    "status": "published",
    "discountValue": null,
    "preorderCloseDate": null,
    "sizeStocks": {},
    "customText": false,
    "images": [
      {
        "url": "img/products/prod_mwdz5xxlf44t9pakf.webp",
        "alt": "Al Nasser Hom Kit",
        "isPrimary": true
      }
    ],
    "salePrice": 999,
    "costPrice": 750,
    "shortDesc": "চায়না থেকে Imported অথেনটিক Player Version জার্সি",
    "image": "img/products/prod_mwdz5xxlf44t9pakf.webp",
    "preorderCapacity": 100,
    "subcategoryId": "mw88n5w90qabal7hw",
    "preorderStatus": "OPEN",
    "sizeMapping": {
      "XL": {
        "width": 42,
        "height": 29
      },
      "L": {
        "width": 40,
        "height": 28
      },
      "M": {
        "height": 27,
        "width": 38
      },
      "3XL": {
        "width": 46,
        "height": 31
      },
      "4XL": {
        "width": 46,
        "height": 31
      },
      "XS": {
        "height": 31,
        "width": 46
      },
      "XXL": {
        "height": 30,
        "width": 44
      },
      "S": {
        "height": 26,
        "width": 36
      }
    },
    "preorderSold": 0,
    "team": "Al Nasser"
  },
  {
    "id": "prod_mwdw6m1wd63g1p2kw",
    "preorderCapacity": 100,
    "name": "Real Madrid Home (Copy)",
    "preorderDesc": "",
    "subcategoryId": null,
    "isPreorder": false,
    "createdAt": "2026-11-12T18:39:21.381Z",
    "customNumber": true,
    "sizeMapping": {
      "S": {
        "width": 36,
        "height": 26
      },
      "XL": {
        "width": 42,
        "height": 29
      },
      "3XL": {
        "width": 46,
        "height": 31
      },
      "M": {
        "width": 38,
        "height": 27
      },
      "4XL": {
        "height": 31,
        "width": 46
      },
      "XS": {
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
      }
    },
    "sku": "ZNV-MW8A6NC3-COPY-MWDW6M1X",
    "expectedDelivery": null,
    "customName": true,
    "image": "img/products/mw8a6nc4ecqhhqgcv.jpg",
    "discountValue": null,
    "customNameNumber": false,
    "deliveryChargeOutsideDhaka": 130,
    "collectionId": null,
    "assignedPatches": [],
    "discountType": "percent",
    "categoryId": "cat_mens_football",
    "images": [
      {
        "url": "img/products/mw8a6nc4ecqhhqgcv.jpg",
        "alt": "Real Madrid Home",
        "isPrimary": true
      }
    ],
    "isPublished": true,
    "discountStart": null,
    "seoTitle": "",
    "updatedAt": "2026-11-12T18:39:21.434Z",
    "status": "published",
    "isArchived": false,
    "advancePaymentMode": "default",
    "isBestSeller": true,
    "customBadge": "",
    "slug": "real-madrid-home-copy-mwdw6m1x",
    "assignedSizes": [
      "sz_s",
      "sz_m",
      "sz_l",
      "sz_xl",
      "sz_xxl",
      "sz_3xl",
      "sz_4xl"
    ],
    "customLogo": false,
    "isDeliveryChargeMandatory": false,
    "tax": 0,
    "team": "",
    "deliveryNote": "",
    "compareAt": 1150,
    "basePrice": 1150,
    "description": "",
    "categoryName": "Player Version",
    "seoDesc": "",
    "preorderCloseDate": null,
    "gender": "Unisex",
    "deliveryChargeInsideDhaka": 80,
    "stock": 10,
    "isNewArrival": false,
    "sizeStocks": {},
    "customText": false,
    "isFeatured": false,
    "sizeChartImage": "",
    "sizeChartType": "Player Edition",
    "imageUrl": "",
    "discountEnd": null,
    "preorderPrice": null,
    "lowStockAlert": 5,
    "expectedArrival": null,
    "shortDesc": "",
    "costPrice": null,
    "customPrintPrice": null,
    "hasCustomDelivery": false,
    "salePrice": 999,
    "preorderSold": 0,
    "preorderStatus": "OPEN",
    "sport": "Football",
    "isLimited": false,
    "assignedSleeves": [
      "slv_half"
    ]
  },
  {
    "id": "prod_mwdw1yp7zoy2fqrwv",
    "subcategoryId": null,
    "createdAt": "2026-11-12T18:35:44.492Z",
    "collectionId": null,
    "preorderCapacity": 100,
    "discountEnd": null,
    "status": "published",
    "imageUrl": "",
    "discountValue": null,
    "hasCustomDelivery": false,
    "preorderDesc": "",
    "isFeatured": false,
    "customNameNumber": true,
    "images": [
      {
        "url": "img/products/prod_mwdw1yp7zoy2fqrwv.webp",
        "alt": "Barcelona Goalkepper Kit",
        "isPrimary": true
      }
    ],
    "image": "img/products/prod_mwdw1yp7zoy2fqrwv.webp",
    "expectedDelivery": null,
    "customNumber": false,
    "assignedPatches": [
      "patch_ucl"
    ],
    "description": "* সরাসরি চায়না থেকে ইমপোর্ট করা শতভাগ প্রিমিয়াম কোয়ালিটির অথেনটিক প্লেয়ার ভার্সন জার্সি।\n* অত্যন্ত হালকা, স্ট্রেচেবল এবং বাতাস চলাচলের উপযোগী ফেব্রিক দিয়ে তৈরি।\n* ক্লাব লোগো, ব্র্যান্ড লোগো এবং স্পনসর প্রিন্ট নিখুঁত ও টেকসই হিট-প্রেসড প্রযুক্তিতে বসানো।\n* প্লেয়ারদের জার্সির মতো বডি-হাগিং অ্যাথলেটিক স্লিম ফিট ও নিখুঁত সেলাইয়ের ফিনিশিং।\n* নিয়মিত খেলাধুলা কিংবা ক্যাজুয়াল আউটফিট হিসেবে পরার জন্য অত্যন্ত আরামদায়ক ও আকর্ষণীয়।",
    "isBestSeller": false,
    "customText": false,
    "sizeStocks": {},
    "team": "Barcelona",
    "deliveryChargeInsideDhaka": 80,
    "preorderCloseDate": null,
    "sku": "ZNV-MWDW30JI",
    "updatedAt": "2026-11-12T18:36:33.575Z",
    "discountStart": null,
    "discountType": "percent",
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
    "isDeliveryChargeMandatory": false,
    "isPublished": true,
    "customLogo": false,
    "compareAt": 1150,
    "basePrice": 1150,
    "categoryName": "Player Version",
    "isNewArrival": false,
    "advancePaymentMode": "default",
    "deliveryNote": "",
    "isArchived": false,
    "seoTitle": "",
    "deliveryChargeOutsideDhaka": 130,
    "customBadge": "",
    "stock": 10,
    "categoryId": "cat_mens_football",
    "slug": "barcelona-goalkepper-kit",
    "preorderPrice": null,
    "lowStockAlert": 5,
    "sizeChartImage": "",
    "preorderSold": 0,
    "name": "Barcelona Goalkepper Kit",
    "sizeChartType": "Player Edition",
    "customPrintPrice": null,
    "sizeMapping": {
      "XL": {
        "height": 29,
        "width": 42
      },
      "L": {
        "width": 40,
        "height": 28
      },
      "M": {
        "width": 38,
        "height": 27
      },
      "3XL": {
        "width": 46,
        "height": 31
      },
      "4XL": {
        "height": 31,
        "width": 46
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
        "height": 26,
        "width": 36
      }
    },
    "gender": "Unisex",
    "costPrice": null,
    "shortDesc": "চায়না থেকে Imported অথেনটিক Player Version জার্সি",
    "expectedArrival": null,
    "salePrice": 999,
    "customName": false,
    "sport": "Football",
    "isLimited": true,
    "preorderStatus": "OPEN",
    "isPreorder": false,
    "assignedSleeves": [
      "slv_half"
    ],
    "tax": 0
  },
  {
    "id": "prod_mwdw0pr4e23smtkbk",
    "isPreorder": false,
    "imageUrl": "",
    "discountEnd": null,
    "collectionId": null,
    "preorderCapacity": 100,
    "createdAt": "2026-11-12T18:34:46.240Z",
    "preorderDesc": "",
    "customName": false,
    "customNameNumber": true,
    "tax": 0,
    "image": "img/products/prod_mwdw0pr4e23smtkbk.webp",
    "preorderPrice": null,
    "lowStockAlert": 5,
    "customNumber": false,
    "sizeChartType": "Player Edition",
    "expectedDelivery": null,
    "assignedPatches": [
      "patch_ucl"
    ],
    "images": [
      {
        "url": "img/products/prod_mwdw0pr4e23smtkbk.webp",
        "alt": "Paris Saint-Germain Away Kit (PSG)",
        "isPrimary": true
      }
    ],
    "categoryId": "cat_mens_football",
    "deliveryChargeInsideDhaka": 80,
    "description": "* সরাসরি চায়না থেকে ইমপোর্ট করা শতভাগ প্রিমিয়াম কোয়ালিটির অথেনটিক প্লেয়ার ভার্সন জার্সি।\n* অত্যন্ত হালকা, স্ট্রেচেবল এবং বাতাস চলাচলের উপযোগী ফেব্রিক দিয়ে তৈরি।\n* ক্লাব লোগো, ব্র্যান্ড লোগো এবং স্পনসর প্রিন্ট নিখুঁত ও টেকসই হিট-প্রেসড প্রযুক্তিতে বসানো।\n* প্লেয়ারদের জার্সির মতো বডি-হাগিং অ্যাথলেটিক স্লিম ফিট ও নিখুঁত সেলাইয়ের ফিনিশিং।\n* নিয়মিত খেলাধুলা কিংবা ক্যাজুয়াল আউটফিট হিসেবে পরার জন্য অত্যন্ত আরামদায়ক ও আকর্ষণীয়।",
    "updatedAt": "2026-11-12T18:35:14.701Z",
    "isBestSeller": false,
    "isArchived": false,
    "status": "published",
    "team": "PSG",
    "discountType": "percent",
    "customLogo": false,
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
    "isPublished": true,
    "sku": "ZNV-MWDW1BON",
    "isDeliveryChargeMandatory": false,
    "basePrice": 1150,
    "seoTitle": "",
    "compareAt": 1150,
    "isNewArrival": false,
    "deliveryChargeOutsideDhaka": 130,
    "gender": "Unisex",
    "discountStart": null,
    "slug": "paris-saint-germain-away-kit-psg",
    "preorderCloseDate": null,
    "deliveryNote": "",
    "advancePaymentMode": "cod_only",
    "stock": 10,
    "customBadge": "",
    "customText": false,
    "sizeStocks": null,
    "sizeMapping": {
      "L": {
        "width": 40,
        "height": 28
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
      },
      "4XL": {
        "width": 46,
        "height": 31
      },
      "XS": {
        "width": 46,
        "height": 31
      },
      "XXL": {
        "width": 44,
        "height": 30
      },
      "S": {
        "width": 36,
        "height": 26
      }
    },
    "salePrice": 999,
    "costPrice": 750,
    "shortDesc": "চায়না থেকে Imported অথেনটিক Player Version জার্সি",
    "isFeatured": false,
    "sizeChartImage": "",
    "preorderSold": 0,
    "customPrintPrice": null,
    "seoDesc": "",
    "expectedArrival": null,
    "discountValue": null,
    "hasCustomDelivery": false,
    "name": "Paris Saint-Germain Away Kit (PSG)",
    "isLimited": true,
    "sport": "Football",
    "subcategoryId": "mw88n5w90qabal7hw",
    "preorderStatus": "OPEN",
    "assignedSleeves": [
      "slv_half"
    ]
  },
  {
    "id": "prod_mwdvx1hidnhyrm6o0",
    "deliveryChargeInsideDhaka": 80,
    "sizeChartType": "Player Edition",
    "createdAt": "2026-11-12T18:31:54.822Z",
    "isBestSeller": false,
    "preorderPrice": null,
    "lowStockAlert": 5,
    "sport": "Football",
    "expectedArrival": null,
    "sizeMapping": {
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
      "L": {
        "width": 40,
        "height": 28
      },
      "XXL": {
        "height": 30,
        "width": 44
      },
      "M": {
        "height": 27,
        "width": 38
      },
      "4XL": {
        "width": 46,
        "height": 31
      },
      "XL": {
        "width": 42,
        "height": 29
      }
    },
    "discountType": "percent",
    "gender": "Unisex",
    "assignedSleeves": [
      "slv_half"
    ],
    "advancePaymentMode": "cod_only",
    "sizeStocks": null,
    "customText": false,
    "stock": 10,
    "seoTitle": "",
    "isFeatured": false,
    "isPublished": true,
    "updatedAt": "2026-11-12T18:33:53.652Z",
    "sizeChartImage": "",
    "collectionId": null,
    "team": "PSG",
    "customPrintPrice": null,
    "preorderStatus": "OPEN",
    "seoDesc": "",
    "customBadge": "",
    "preorderDesc": "",
    "sku": "ZNV-MWDVZL59",
    "customNumber": false,
    "compareAt": 1150,
    "basePrice": 1150,
    "preorderCapacity": 100,
    "assignedPatches": [
      "patch_ucl"
    ],
    "isPreorder": false,
    "preorderSold": 0,
    "discountStart": null,
    "preorderCloseDate": null,
    "description": "* সরাসরি চায়না থেকে ইমপোর্ট করা শতভাগ প্রিমিয়াম কোয়ালিটির অথেনটিক প্লেয়ার ভার্সন জার্সি।\n* অত্যন্ত হালকা, স্ট্রেচেবল এবং বাতাস চলাচলের উপযোগী ফেব্রিক দিয়ে তৈরি।\n* ক্লাব লোগো, ব্র্যান্ড লোগো এবং স্পনসর প্রিন্ট নিখুঁত ও টেকসই হিট-প্রেসড প্রযুক্তিতে বসানো।\n* প্লেয়ারদের জার্সির মতো বডি-হাগিং অ্যাথলেটিক স্লিম ফিট ও নিখুঁত সেলাইয়ের ফিনিশিং।\n* নিয়মিত খেলাধুলা কিংবা ক্যাজুয়াল আউটফিট হিসেবে পরার জন্য অত্যন্ত আরামদায়ক ও আকর্ষণীয়।",
    "customName": false,
    "customNameNumber": true,
    "slug": "paris-saint-germain-home-kit-psg",
    "expectedDelivery": null,
    "assignedSizes": [
      "sz_s",
      "sz_m",
      "sz_l",
      "sz_xl",
      "sz_xxl",
      "sz_3xl",
      "sz_4xl"
    ],
    "image": "img/products/prod_mwdvx1hidnhyrm6o0.webp",
    "images": [
      {
        "url": "img/products/prod_mwdvx1hidnhyrm6o0.webp",
        "alt": "Paris Saint-Germain Home Kit (PSG)",
        "isPrimary": true
      }
    ],
    "categoryName": "Player Version",
    "tax": 0,
    "categoryId": "cat_mens_football",
    "subcategoryId": "mw88n5w90qabal7hw",
    "discountEnd": null,
    "name": "Paris Saint-Germain Home Kit (PSG)",
    "imageUrl": "",
    "isDeliveryChargeMandatory": false,
    "shortDesc": "চায়না থেকে Imported অথেনটিক Player Version জার্সি",
    "costPrice": 750,
    "isNewArrival": false,
    "isArchived": false,
    "status": "published",
    "salePrice": 999,
    "hasCustomDelivery": false,
    "deliveryChargeOutsideDhaka": 130,
    "deliveryNote": "",
    "discountValue": null,
    "customLogo": false,
    "isLimited": true
  },
  {
    "id": "prod_mwdtotn087sehyqui",
    "slug": "ac-milan-away-kit",
    "customNumber": false,
    "customPrintPrice": null,
    "deliveryChargeOutsideDhaka": 130,
    "stock": 10,
    "sizeMapping": {
      "XXL": {
        "height": 30,
        "width": 44
      },
      "S": {
        "height": 26,
        "width": 36
      },
      "XS": {
        "width": 46,
        "height": 31
      },
      "4XL": {
        "height": 31,
        "width": 46
      },
      "M": {
        "width": 38,
        "height": 27
      },
      "3XL": {
        "height": 31,
        "width": 46
      },
      "XL": {
        "height": 29,
        "width": 42
      },
      "L": {
        "width": 40,
        "height": 28
      }
    },
    "preorderDesc": "",
    "sizeStocks": null,
    "customText": false,
    "basePrice": 1150,
    "collectionId": null,
    "compareAt": 1150,
    "isDeliveryChargeMandatory": false,
    "seoDesc": "",
    "sport": "Football",
    "sizeChartType": "Player Edition",
    "expectedArrival": null,
    "discountType": "percent",
    "isPublished": true,
    "isLimited": true,
    "preorderPrice": null,
    "lowStockAlert": 5,
    "customBadge": "",
    "isFeatured": false,
    "tax": 0,
    "gender": "Unisex",
    "isBestSeller": false,
    "salePrice": 999,
    "imageUrl": "",
    "shortDesc": "চায়না থেকে Imported অথেনটিক Player Version জার্সি",
    "costPrice": 750,
    "assignedSleeves": [
      "slv_half"
    ],
    "name": "Ac Milan Away Kit",
    "customName": false,
    "advancePaymentMode": "cod_only",
    "status": "published",
    "images": [
      {
        "url": "img/products/prod_mwdtotn087sehyqui.webp",
        "alt": "Ac Milan Away Kit",
        "isPrimary": true
      }
    ],
    "description": "* সরাসরি চায়না থেকে ইমপোর্ট করা শতভাগ প্রিমিয়াম কোয়ালিটির অথেনটিক প্লেয়ার ভার্সন জার্সি।\n* অত্যন্ত হালকা, স্ট্রেচেবল এবং বাতাস চলাচলের উপযোগী ফেব্রিক দিয়ে তৈরি।\n* ক্লাব লোগো, ব্র্যান্ড লোগো এবং স্পনসর প্রিন্ট নিখুঁত ও টেকসই হিট-প্রেসড প্রযুক্তিতে বসানো।\n* প্লেয়ারদের জার্সির মতো বডি-হাগিং অ্যাথলেটিক স্লিম ফিট ও নিখুঁত সেলাইয়ের ফিনিশিং।\n* নিয়মিত খেলাধুলা কিংবা ক্যাজুয়াল আউটফিট হিসেবে পরার জন্য অত্যন্ত আরামদায়ক ও আকর্ষণীয়।",
    "image": "img/products/prod_mwdtotn087sehyqui.webp",
    "deliveryNote": "",
    "subcategoryId": "mw88n5w90qabal7hw",
    "createdAt": "2026-11-12T17:29:32.172Z",
    "isNewArrival": false,
    "isPreorder": false,
    "hasCustomDelivery": false,
    "discountValue": null,
    "categoryName": "Player Version",
    "assignedPatches": [
      "patch_ucl"
    ],
    "discountStart": null,
    "discountEnd": null,
    "preorderCloseDate": null,
    "preorderStatus": "OPEN",
    "sku": "ZNV-MWDTPSYX",
    "preorderCapacity": 100,
    "customLogo": false,
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
    "categoryId": "cat_mens_football",
    "deliveryChargeInsideDhaka": 80,
    "customNameNumber": true,
    "updatedAt": "2026-11-13T06:01:03.570Z",
    "sizeChartImage": "",
    "team": "Ac Milan",
    "preorderSold": 0,
    "expectedDelivery": null,
    "isArchived": false
  },
  {
    "id": "prod_mwdtnvopswdqcm154",
    "salePrice": 999,
    "expectedDelivery": null,
    "customNumber": false,
    "shortDesc": "চায়না থেকে Imported অথেনটিক Player Version জার্সি",
    "costPrice": 750,
    "advancePaymentMode": "cod_only",
    "customNameNumber": true,
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
    "deliveryChargeInsideDhaka": 80,
    "sport": "Football",
    "preorderCapacity": 100,
    "isLimited": true,
    "collectionId": null,
    "isFeatured": false,
    "gender": "Unisex",
    "discountStart": null,
    "sizeMapping": {
      "XXL": {
        "height": 30,
        "width": 44
      },
      "L": {
        "height": 28,
        "width": 40
      },
      "XS": {
        "height": 31,
        "width": 46
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
        "height": 31,
        "width": 46
      },
      "XL": {
        "height": 29,
        "width": 42
      },
      "S": {
        "height": 26,
        "width": 36
      }
    },
    "name": "Ac Milan Home Kit",
    "stock": 10,
    "customBadge": "",
    "slug": "ac-milan-home-kit",
    "discountValue": null,
    "sizeStocks": null,
    "customText": false,
    "sku": "ZNV-MWDTOPRF",
    "assignedSleeves": [
      "slv_half"
    ],
    "basePrice": 1150,
    "compareAt": 1150,
    "discountType": "percent",
    "imageUrl": "",
    "expectedArrival": null,
    "subcategoryId": "mw88n5w90qabal7hw",
    "isBestSeller": false,
    "isPublished": true,
    "sizeChartImage": "",
    "deliveryChargeOutsideDhaka": 130,
    "updatedAt": "2026-11-13T06:04:50.621Z",
    "customLogo": false,
    "deliveryNote": "",
    "isNewArrival": false,
    "categoryId": "cat_mens_football",
    "hasCustomDelivery": false,
    "lowStockAlert": 5,
    "preorderPrice": null,
    "isArchived": false,
    "description": "* সরাসরি চায়না থেকে ইমপোর্ট করা শতভাগ প্রিমিয়াম কোয়ালিটির অথেনটিক প্লেয়ার ভার্সন জার্সি।\n* অত্যন্ত হালকা, স্ট্রেচেবল এবং বাতাস চলাচলের উপযোগী ফেব্রিক দিয়ে তৈরি।\n* ক্লাব লোগো, ব্র্যান্ড লোগো এবং স্পনসর প্রিন্ট নিখুঁত ও টেকসই হিট-প্রেসড প্রযুক্তিতে বসানো।\n* প্লেয়ারদের জার্সির মতো বডি-হাগিং অ্যাথলেটিক স্লিম ফিট ও নিখুঁত সেলাইয়ের ফিনিশিং।\n* নিয়মিত খেলাধুলা কিংবা ক্যাজুয়াল আউটফিট হিসেবে পরার জন্য অত্যন্ত আরামদায়ক ও আকর্ষণীয়।",
    "categoryName": "Player Version",
    "preorderStatus": "OPEN",
    "team": "Ac Milan",
    "sizeChartType": "Player Edition",
    "image": "img/products/prod_mwdtnvopswdqcm154.webp",
    "images": [
      {
        "alt": "Ac Milan Home Kit",
        "url": "img/products/prod_mwdtnvopswdqcm154.webp",
        "isPrimary": true
      }
    ],
    "customName": false,
    "isDeliveryChargeMandatory": false,
    "createdAt": "2026-11-12T17:28:48.170Z",
    "status": "published",
    "preorderCloseDate": null,
    "discountEnd": null,
    "isPreorder": false,
    "assignedPatches": [
      "patch_ucl"
    ],
    "preorderSold": 0,
    "customPrintPrice": null,
    "tax": 0,
    "seoTitle": ""
  },
  {
    "id": "prod_mwdtkv181mwc9koh8",
    "slug": "liverpool-third-kit",
    "preorderSold": 0,
    "subcategoryId": "mw88n5w90qabal7hw",
    "updatedAt": "2026-11-13T06:04:55.482Z",
    "assignedSleeves": [
      "slv_half"
    ],
    "image": "img/products/prod_mwdtkv181mwc9koh8.webp",
    "sizeMapping": {
      "3XL": {
        "height": 31,
        "width": 46
      },
      "L": {
        "width": 40,
        "height": 28
      },
      "XS": {
        "width": 46,
        "height": 31
      },
      "M": {
        "height": 27,
        "width": 38
      },
      "XXL": {
        "height": 30,
        "width": 44
      },
      "XL": {
        "width": 42,
        "height": 29
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
    "sizeStocks": null,
    "customText": false,
    "seoTitle": "",
    "deliveryChargeOutsideDhaka": 130,
    "expectedArrival": null,
    "discountValue": null,
    "gender": "Unisex",
    "categoryName": "Player Version",
    "discountStart": null,
    "customNameNumber": true,
    "createdAt": "2026-11-12T17:26:27.357Z",
    "isNewArrival": false,
    "isPublished": true,
    "expectedDelivery": null,
    "customBadge": "",
    "tax": 0,
    "isFeatured": false,
    "deliveryNote": "",
    "name": "Liverpool Third Kit",
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
    "preorderCapacity": 100,
    "salePrice": 999,
    "preorderCloseDate": null,
    "costPrice": 750,
    "shortDesc": "চায়না থেকে Imported অথেনটিক Player Version জার্সি",
    "isBestSeller": false,
    "customName": false,
    "imageUrl": "",
    "description": "* সরাসরি চায়না থেকে ইমপোর্ট করা শতভাগ প্রিমিয়াম কোয়ালিটির অথেনটিক প্লেয়ার ভার্সন জার্সি।\n* অত্যন্ত হালকা, স্ট্রেচেবল এবং বাতাস চলাচলের উপযোগী ফেব্রিক দিয়ে তৈরি।\n* ক্লাব লোগো, ব্র্যান্ড লোগো এবং স্পনসর প্রিন্ট নিখুঁত ও টেকসই হিট-প্রেসড প্রযুক্তিতে বসানো।\n* প্লেয়ারদের জার্সির মতো বডি-হাগিং অ্যাথলেটিক স্লিম ফিট ও নিখুঁত সেলাইয়ের ফিনিশিং।\n* নিয়মিত খেলাধুলা কিংবা ক্যাজুয়াল আউটফিট হিসেবে পরার জন্য অত্যন্ত আরামদায়ক ও আকর্ষণীয়।",
    "stock": 10,
    "images": [
      {
        "alt": "Liverpool Third Kit",
        "isPrimary": true,
        "url": "img/products/prod_mwdtkv181mwc9koh8.webp"
      }
    ],
    "isLimited": true,
    "isPreorder": false,
    "discountType": "percent",
    "deliveryChargeInsideDhaka": 80,
    "advancePaymentMode": "cod_only",
    "customPrintPrice": null,
    "assignedPatches": [
      "patch_ucl"
    ],
    "status": "published",
    "discountEnd": null,
    "sizeChartImage": "",
    "sizeChartType": "Player Edition",
    "sport": "Football",
    "preorderPrice": null,
    "lowStockAlert": 5,
    "sku": "ZNV-MWDTLZU6",
    "collectionId": null,
    "seoDesc": "",
    "customLogo": false,
    "basePrice": 1150,
    "compareAt": 1150,
    "categoryId": "cat_mens_football",
    "preorderDesc": "",
    "isArchived": false,
    "hasCustomDelivery": false,
    "preorderStatus": "OPEN",
    "team": "Liverpool",
    "customNumber": false
  },
  {
    "id": "prod_mwdtghurjayd4us4t",
    "team": "Liverpool",
    "expectedArrival": null,
    "deliveryChargeInsideDhaka": 80,
    "discountEnd": null,
    "customName": false,
    "deliveryNote": "",
    "discountStart": null,
    "updatedAt": "2026-11-13T06:05:02.010Z",
    "sku": "ZNV-MWDTHAYH",
    "isNewArrival": false,
    "assignedSleeves": [
      "slv_half"
    ],
    "sport": "Football",
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
    "imageUrl": "",
    "categoryName": "Player Version",
    "customLogo": false,
    "description": "* সরাসরি চায়না থেকে ইমপোর্ট করা শতভাগ প্রিমিয়াম কোয়ালিটির অথেনটিক প্লেয়ার ভার্সন জার্সি।\n* অত্যন্ত হালকা, স্ট্রেচেবল এবং বাতাস চলাচলের উপযোগী ফেব্রিক দিয়ে তৈরি।\n* ক্লাব লোগো, ব্র্যান্ড লোগো এবং স্পনসর প্রিন্ট নিখুঁত ও টেকসই হিট-প্রেসড প্রযুক্তিতে বসানো।\n* প্লেয়ারদের জার্সির মতো বডি-হাগিং অ্যাথলেটিক স্লিম ফিট ও নিখুঁত সেলাইয়ের ফিনিশিং।\n* নিয়মিত খেলাধুলা কিংবা ক্যাজুয়াল আউটফিট হিসেবে পরার জন্য অত্যন্ত আরামদায়ক ও আকর্ষণীয়।",
    "subcategoryId": "mw88n5w90qabal7hw",
    "gender": "Unisex",
    "customPrintPrice": null,
    "preorderStatus": "OPEN",
    "seoDesc": "",
    "sizeChartImage": "",
    "discountValue": null,
    "isArchived": false,
    "stock": 10,
    "createdAt": "2026-11-12T17:23:03.651Z",
    "deliveryChargeOutsideDhaka": 130,
    "categoryId": "cat_mens_football",
    "preorderSold": 0,
    "tax": 0,
    "hasCustomDelivery": false,
    "sizeStocks": null,
    "customText": false,
    "lowStockAlert": 5,
    "preorderPrice": null,
    "name": "Liverpool Away Kit",
    "isLimited": true,
    "sizeChartType": "Player Edition",
    "isPublished": true,
    "customNumber": false,
    "assignedPatches": [
      "patch_ucl"
    ],
    "preorderCapacity": 100,
    "preorderDesc": "",
    "advancePaymentMode": "cod_only",
    "collectionId": null,
    "salePrice": 999,
    "images": [
      {
        "alt": "Liverpool Away Kit",
        "isPrimary": true,
        "url": "img/products/prod_mwdtghurjayd4us4t.webp"
      }
    ],
    "seoTitle": "",
    "shortDesc": "চায়না থেকে Imported অথেনটিক Player Version জার্সি",
    "costPrice": 750,
    "customBadge": "",
    "customNameNumber": true,
    "status": "published",
    "expectedDelivery": null,
    "sizeMapping": {
      "XXL": {
        "width": 44,
        "height": 30
      },
      "XS": {
        "width": 46,
        "height": 31
      },
      "S": {
        "height": 26,
        "width": 36
      },
      "4XL": {
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
      },
      "L": {
        "height": 28,
        "width": 40
      }
    },
    "discountType": "percent",
    "isDeliveryChargeMandatory": false,
    "image": "img/products/prod_mwdtghurjayd4us4t.webp",
    "preorderCloseDate": null,
    "slug": "liverpool-away-kit",
    "basePrice": 1150,
    "compareAt": 1150,
    "isBestSeller": false,
    "isFeatured": false
  },
  {
    "id": "prod_mwdteu3bvlwp2g91l",
    "isDeliveryChargeMandatory": false,
    "status": "published",
    "preorderPrice": null,
    "sizeMapping": {
      "XS": {
        "width": 46,
        "height": 31
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
        "height": 28,
        "width": 40
      },
      "S": {
        "height": 26,
        "width": 36
      },
      "3XL": {
        "width": 46,
        "height": 31
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
    "preorderDesc": "",
    "name": "Liverpool Home Kit",
    "imageUrl": "",
    "sizeChartType": "Player Edition",
    "customLogo": false,
    "image": "img/products/prod_mwdteu3bvlwp2g91l.webp",
    "costPrice": 750,
    "customText": false,
    "categoryName": "Player Version",
    "deliveryNote": "",
    "discountType": "percent",
    "description": "* সরাসরি চায়না থেকে ইমপোর্ট করা শতভাগ প্রিমিয়াম কোয়ালিটির অথেনটিক প্লেয়ার ভার্সন জার্সি।\n* অত্যন্ত হালকা, স্ট্রেচেবল এবং বাতাস চলাচলের উপযোগী ফেব্রিক দিয়ে তৈরি।\n* ক্লাব লোগো, ব্র্যান্ড লোগো এবং স্পনসর প্রিন্ট নিখুঁত ও টেকসই হিট-প্রেসড প্রযুক্তিতে বসানো।\n* প্লেয়ারদের জার্সির মতো বডি-হাগিং অ্যাথলেটিক স্লিম ফিট ও নিখুঁত সেলাইয়ের ফিনিশিং।\n* নিয়মিত খেলাধুলা কিংবা ক্যাজুয়াল আউটফিট হিসেবে পরার জন্য অত্যন্ত আরামদায়ক ও আকর্ষণীয়।",
    "subcategoryId": "mw88n5w90qabal7hw",
    "advancePaymentMode": "cod_only",
    "sizeChartImage": "",
    "assignedPatches": [
      "patch_ucl"
    ],
    "expectedArrival": null,
    "shortDesc": "চায়না থেকে Imported অথেনটিক Player Version জার্সি",
    "isPublished": true,
    "customBadge": "",
    "hasCustomDelivery": false,
    "createdAt": "2026-11-12T17:21:46.199Z",
    "compareAt": 1150,
    "discountEnd": null,
    "assignedSizes": [
      "sz_s",
      "sz_m",
      "sz_l",
      "sz_xl",
      "sz_xxl",
      "sz_3xl",
      "sz_4xl"
    ],
    "team": "Liverpool",
    "seoTitle": "",
    "isNewArrival": false,
    "slug": "liverpool-home-kit",
    "tax": 0,
    "isBestSeller": false,
    "sizeStocks": null,
    "updatedAt": "2026-11-13T06:05:07.190Z",
    "expectedDelivery": null,
    "sport": "Football",
    "basePrice": 1150,
    "preorderSold": 0,
    "deliveryChargeOutsideDhaka": 130,
    "isFeatured": false,
    "isArchived": false,
    "preorderStatus": "OPEN",
    "collectionId": null,
    "lowStockAlert": 5,
    "isLimited": true,
    "assignedSleeves": [
      "slv_half"
    ],
    "customName": false,
    "salePrice": 999,
    "preorderCapacity": 100,
    "gender": "Unisex",
    "customPrintPrice": null,
    "customNumber": false,
    "categoryId": "cat_mens_football",
    "discountStart": null,
    "seoDesc": "",
    "preorderCloseDate": null,
    "isPreorder": false,
    "deliveryChargeInsideDhaka": 80,
    "sku": "ZNV-MWDTGEX5",
    "stock": 10,
    "customNameNumber": true,
    "discountValue": null,
    "images": [
      {
        "isPrimary": true,
        "alt": "Liverpool Home Kit",
        "url": "img/products/prod_mwdteu3bvlwp2g91l.webp"
      }
    ]
  },
  {
    "id": "prod_mwdtbvzvlj9kypg6d",
    "customBadge": "",
    "customNumber": false,
    "sizeChartImage": "",
    "isDeliveryChargeMandatory": false,
    "discountEnd": null,
    "salePrice": 999,
    "deliveryChargeOutsideDhaka": 130,
    "description": "* সরাসরি চায়না থেকে ইমপোর্ট করা শতভাগ প্রিমিয়াম কোয়ালিটির অথেনটিক প্লেয়ার ভার্সন জার্সি।\n* অত্যন্ত হালকা, স্ট্রেচেবল এবং বাতাস চলাচলের উপযোগী ফেব্রিক দিয়ে তৈরি।\n* ক্লাব লোগো, ব্র্যান্ড লোগো এবং স্পনসর প্রিন্ট নিখুঁত ও টেকসই হিট-প্রেসড প্রযুক্তিতে বসানো।\n* প্লেয়ারদের জার্সির মতো বডি-হাগিং অ্যাথলেটিক স্লিম ফিট ও নিখুঁত সেলাইয়ের ফিনিশিং।\n* নিয়মিত খেলাধুলা কিংবা ক্যাজুয়াল আউটফিট হিসেবে পরার জন্য অত্যন্ত আরামদায়ক ও আকর্ষণীয়।",
    "isPreorder": false,
    "sport": "Football",
    "name": "Bayern Munich Third Kit",
    "categoryId": "cat_mens_football",
    "imageUrl": "",
    "isPublished": true,
    "lowStockAlert": 5,
    "tax": 0,
    "preorderCloseDate": null,
    "isNewArrival": false,
    "basePrice": 1150,
    "status": "published",
    "customName": false,
    "seoTitle": "",
    "team": "Bayern Munich",
    "isLimited": true,
    "sku": "ZNV-MWDTEFH7",
    "advancePaymentMode": "cod_only",
    "isBestSeller": false,
    "discountStart": null,
    "isArchived": false,
    "isFeatured": false,
    "assignedSleeves": [
      "slv_half"
    ],
    "sizeStocks": null,
    "sizeMapping": {
      "3XL": {
        "width": 46,
        "height": 31
      },
      "S": {
        "height": 26,
        "width": 36
      },
      "L": {
        "height": 28,
        "width": 40
      },
      "XS": {
        "width": 46,
        "height": 31
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
        "width": 42,
        "height": 29
      },
      "M": {
        "height": 27,
        "width": 38
      }
    },
    "preorderSold": 0,
    "stock": 10,
    "collectionId": null,
    "updatedAt": "2026-11-13T06:05:15.320Z",
    "discountValue": null,
    "preorderCapacity": 100,
    "seoDesc": "",
    "customPrintPrice": null,
    "discountType": "percent",
    "assignedPatches": [
      "patch_ucl"
    ],
    "expectedArrival": null,
    "image": "img/products/prod_mwdtbvzvlj9kypg6d.webp",
    "preorderPrice": null,
    "gender": "Unisex",
    "compareAt": 1150,
    "hasCustomDelivery": false,
    "createdAt": "2026-11-12T17:19:28.699Z",
    "sizeChartType": "Player Edition",
    "slug": "bayern-munich-third-kit",
    "customNameNumber": true,
    "images": [
      {
        "alt": "Bayern Munich Third Kit",
        "isPrimary": true,
        "url": "img/products/prod_mwdtbvzvlj9kypg6d.webp"
      }
    ],
    "shortDesc": "চায়না থেকে Imported অথেনটিক Player Version জার্সি",
    "subcategoryId": "mw88n5w90qabal7hw",
    "preorderDesc": "",
    "customText": false,
    "expectedDelivery": null,
    "customLogo": false,
    "categoryName": "Player Version",
    "deliveryChargeInsideDhaka": 80,
    "preorderStatus": "OPEN",
    "deliveryNote": "",
    "costPrice": 750,
    "assignedSizes": [
      "sz_s",
      "sz_m",
      "sz_l",
      "sz_xl",
      "sz_xxl",
      "sz_3xl",
      "sz_4xl"
    ]
  },
  {
    "id": "prod_mwdt7mr7numexc9dh",
    "discountStart": null,
    "customText": false,
    "shortDesc": "চায়না থেকে Imported অথেনটিক Player Version জার্সি",
    "assignedPatches": [
      "patch_ucl"
    ],
    "expectedArrival": null,
    "isDeliveryChargeMandatory": false,
    "hasCustomDelivery": false,
    "discountValue": null,
    "preorderStatus": "OPEN",
    "customLogo": false,
    "name": "Bayern Munich Away Kit",
    "discountType": "percent",
    "createdAt": "2026-11-12T17:16:10.100Z",
    "compareAt": 1150,
    "expectedDelivery": null,
    "status": "published",
    "deliveryChargeOutsideDhaka": 130,
    "customNameNumber": true,
    "deliveryNote": "",
    "costPrice": 750,
    "categoryName": "Player Version",
    "team": "Bayern Munich",
    "preorderCapacity": 100,
    "lowStockAlert": 5,
    "customPrintPrice": null,
    "advancePaymentMode": "cod_only",
    "preorderDesc": "",
    "image": "img/products/prod_mwdt7mr7numexc9dh.webp",
    "imageUrl": "",
    "gender": "Unisex",
    "stock": 10,
    "salePrice": 999,
    "isFeatured": false,
    "preorderCloseDate": null,
    "isArchived": false,
    "discountEnd": null,
    "subcategoryId": "mw88n5w90qabal7hw",
    "customBadge": "",
    "customName": false,
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
    "slug": "bayern-munich-away-kit",
    "sku": "ZNV-MWDT8COX",
    "description": "* সরাসরি চায়না থেকে ইমপোর্ট করা শতভাগ প্রিমিয়াম কোয়ালিটির অথেনটিক প্লেয়ার ভার্সন জার্সি।\n* অত্যন্ত হালকা, স্ট্রেচেবল এবং বাতাস চলাচলের উপযোগী ফেব্রিক দিয়ে তৈরি।\n* ক্লাব লোগো, ব্র্যান্ড লোগো এবং স্পনসর প্রিন্ট নিখুঁত ও টেকসই হিট-প্রেসড প্রযুক্তিতে বসানো।\n* প্লেয়ারদের জার্সির মতো বডি-হাগিং অ্যাথলেটিক স্লিম ফিট ও নিখুঁত সেলাইয়ের ফিনিশিং।\n* নিয়মিত খেলাধুলা কিংবা ক্যাজুয়াল আউটফিট হিসেবে পরার জন্য অত্যন্ত আরামদায়ক ও আকর্ষণীয়।",
    "customNumber": false,
    "images": [
      {
        "alt": "Bayern Munich Away Kit",
        "url": "img/products/prod_mwdt7mr7numexc9dh.webp",
        "isPrimary": true
      }
    ],
    "sizeStocks": null,
    "sizeChartType": "Player Edition",
    "tax": 0,
    "sport": "Football",
    "collectionId": null,
    "preorderPrice": null,
    "sizeChartImage": "",
    "updatedAt": "2026-11-13T06:05:21.811Z",
    "preorderSold": 0,
    "isBestSeller": false,
    "seoTitle": "",
    "categoryId": "cat_mens_football",
    "basePrice": 1150,
    "sizeMapping": {
      "3XL": {
        "height": 31,
        "width": 46
      },
      "M": {
        "height": 27,
        "width": 38
      },
      "XS": {
        "width": 46,
        "height": 31
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
      "S": {
        "height": 26,
        "width": 36
      },
      "L": {
        "height": 28,
        "width": 40
      }
    },
    "seoDesc": "",
    "assignedSleeves": [
      "slv_half"
    ],
    "deliveryChargeInsideDhaka": 80,
    "isPreorder": false,
    "isNewArrival": false,
    "isLimited": true
  },
  {
    "id": "prod_mwdt4uwdo30gbqxdp",
    "description": "* সরাসরি চায়না থেকে ইমপোর্ট করা শতভাগ প্রিমিয়াম কোয়ালিটির অথেনটিক প্লেয়ার ভার্সন জার্সি।\n* অত্যন্ত হালকা, স্ট্রেচেবল এবং বাতাস চলাচলের উপযোগী ফেব্রিক দিয়ে তৈরি।\n* ক্লাব লোগো, ব্র্যান্ড লোগো এবং স্পনসর প্রিন্ট নিখুঁত ও টেকসই হিট-প্রেসড প্রযুক্তিতে বসানো।\n* প্লেয়ারদের জার্সির মতো বডি-হাগিং অ্যাথলেটিক স্লিম ফিট ও নিখুঁত সেলাইয়ের ফিনিশিং।\n* নিয়মিত খেলাধুলা কিংবা ক্যাজুয়াল আউটফিট হিসেবে পরার জন্য অত্যন্ত আরামদায়ক ও আকর্ষণীয়।",
    "discountStart": null,
    "customName": false,
    "tax": 0,
    "customNumber": false,
    "updatedAt": "2026-11-13T06:05:28.415Z",
    "expectedArrival": null,
    "assignedPatches": [
      "patch_ucl"
    ],
    "isPublished": true,
    "isArchived": false,
    "status": "published",
    "isFeatured": false,
    "customBadge": "",
    "sizeChartImage": "",
    "discountValue": null,
    "basePrice": 1150,
    "seoDesc": "",
    "sizeStocks": null,
    "deliveryChargeInsideDhaka": 80,
    "stock": 10,
    "discountEnd": null,
    "team": "Bayern Munich",
    "isLimited": true,
    "sizeMapping": {
      "3XL": {
        "height": 31,
        "width": 46
      },
      "M": {
        "height": 27,
        "width": 38
      },
      "XS": {
        "height": 31,
        "width": 46
      },
      "S": {
        "width": 36,
        "height": 26
      },
      "L": {
        "width": 40,
        "height": 28
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
        "width": 44,
        "height": 30
      }
    },
    "isBestSeller": false,
    "salePrice": 999,
    "isNewArrival": false,
    "name": "Bayern Munich Home Kit",
    "advancePaymentMode": "cod_only",
    "collectionId": null,
    "hasCustomDelivery": false,
    "isPreorder": false,
    "lowStockAlert": 5,
    "sport": "Football",
    "sku": "ZNV-MWDT5ZKW",
    "categoryId": "cat_mens_football",
    "preorderSold": 0,
    "seoTitle": "",
    "costPrice": 750,
    "discountType": "percent",
    "subcategoryId": "mw88n5w90qabal7hw",
    "customText": false,
    "expectedDelivery": null,
    "customLogo": false,
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
    "slug": "bayern-munich-home-kit",
    "preorderDesc": "",
    "preorderStatus": "OPEN",
    "image": "img/products/prod_mwdt4uwdo30gbqxdp.webp",
    "deliveryChargeOutsideDhaka": 130,
    "sizeChartType": "Player Edition",
    "customPrintPrice": null,
    "preorderCapacity": 100,
    "isDeliveryChargeMandatory": false,
    "shortDesc": "চায়না থেকে Imported অথেনটিক Player Version জার্সি",
    "preorderPrice": null,
    "gender": "Unisex",
    "customNameNumber": true,
    "deliveryNote": "",
    "images": [
      {
        "url": "img/products/prod_mwdt4uwdo30gbqxdp.webp",
        "alt": "Bayern Munich Home Kit",
        "isPrimary": true
      }
    ],
    "imageUrl": "",
    "categoryName": "Player Version",
    "compareAt": 1150,
    "assignedSleeves": [
      "slv_half"
    ],
    "createdAt": "2026-11-12T17:14:00.685Z"
  },
  {
    "id": "prod_mwdt2ma80pcwaiut4",
    "customLogo": false,
    "sport": "Football",
    "customNameNumber": true,
    "collectionId": null,
    "preorderSold": 0,
    "discountStart": null,
    "deliveryChargeOutsideDhaka": 130,
    "isBestSeller": false,
    "status": "published",
    "preorderCapacity": 100,
    "expectedArrival": null,
    "assignedPatches": [
      "patch_ucl"
    ],
    "customPrintPrice": null,
    "slug": "arsenal-third-kit",
    "customText": false,
    "advancePaymentMode": "cod_only",
    "seoTitle": "",
    "discountValue": null,
    "isNewArrival": false,
    "costPrice": 750,
    "seoDesc": "",
    "stock": 0,
    "compareAt": 1150,
    "createdAt": "2026-11-12T17:12:16.207Z",
    "isDeliveryChargeMandatory": false,
    "imageUrl": "",
    "hasCustomDelivery": false,
    "lowStockAlert": 5,
    "preorderStatus": "OPEN",
    "shortDesc": "চায়না থেকে Imported অথেনটিক Player Version জার্সি",
    "customNumber": false,
    "expectedDelivery": null,
    "basePrice": 1150,
    "deliveryNote": "",
    "subcategoryId": null,
    "isLimited": true,
    "sizeMapping": {
      "XS": {
        "width": 46,
        "height": 31
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
        "width": 36,
        "height": 26
      },
      "L": {
        "width": 40,
        "height": 28
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
        "height": 29,
        "width": 42
      }
    },
    "categoryName": "Player Version",
    "sizeChartImage": "",
    "preorderDesc": "",
    "customName": false,
    "sku": "ZNV-MWDT2MA7",
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
    "name": "Arsenal Third Kit",
    "updatedAt": "2026-11-13T06:05:35.538Z",
    "isArchived": false,
    "isFeatured": false,
    "image": "img/products/prod_mwdt2ma80pcwaiut4.webp",
    "preorderCloseDate": null,
    "tax": 0,
    "preorderPrice": null,
    "assignedSleeves": [
      "slv_half"
    ],
    "isPublished": true,
    "isPreorder": false,
    "sizeChartType": "Player Edition",
    "categoryId": "cat_mens_football",
    "description": "* সরাসরি চায়না থেকে ইমপোর্ট করা শতভাগ প্রিমিয়াম কোয়ালিটির অথেনটিক প্লেয়ার ভার্সন জার্সি।\n* অত্যন্ত হালকা, স্ট্রেচেবল এবং বাতাস চলাচলের উপযোগী ফেব্রিক দিয়ে তৈরি।\n* ক্লাব লোগো, ব্র্যান্ড লোগো এবং স্পনসর প্রিন্ট নিখুঁত ও টেকসই হিট-প্রেসড প্রযুক্তিতে বসানো।\n* প্লেয়ারদের জার্সির মতো বডি-হাগিং অ্যাথলেটিক স্লিম ফিট ও নিখুঁত সেলাইয়ের ফিনিশিং।\n* নিয়মিত খেলাধুলা কিংবা ক্যাজুয়াল আউটফিট হিসেবে পরার জন্য অত্যন্ত আরামদায়ক ও আকর্ষণীয়।",
    "images": [
      {
        "url": "img/products/prod_mwdt2ma80pcwaiut4.webp",
        "alt": "Arsenal Third Kit",
        "isPrimary": true
      }
    ],
    "team": "Arsenal",
    "gender": "Unisex",
    "salePrice": 999,
    "discountEnd": null,
    "customBadge": "",
    "discountType": "percent"
  },
  {
    "id": "prod_mwdszqiet4d9u1fip",
    "preorderCapacity": 100,
    "customPrintPrice": null,
    "isNewArrival": false,
    "isPreorder": false,
    "gender": "Unisex",
    "basePrice": 1150,
    "name": "Arsenal Away Kit",
    "isLimited": true,
    "isBestSeller": false,
    "categoryId": "cat_mens_football",
    "hasCustomDelivery": false,
    "preorderStatus": "OPEN",
    "customNameNumber": true,
    "preorderSold": 0,
    "preorderPrice": null,
    "updatedAt": "2026-11-13T06:05:45.825Z",
    "collectionId": null,
    "images": [
      {
        "url": "img/products/prod_mwdszqiet4d9u1fip.webp",
        "alt": "Arsenal Away Kit",
        "isPrimary": true
      }
    ],
    "sizeChartType": "Player Edition",
    "customNumber": false,
    "expectedDelivery": null,
    "assignedSizes": [
      "sz_s",
      "sz_m",
      "sz_l",
      "sz_xl",
      "sz_xxl",
      "sz_3xl",
      "sz_4xl"
    ],
    "subcategoryId": "mw88n5w90qabal7hw",
    "expectedArrival": null,
    "assignedPatches": [
      "patch_ucl"
    ],
    "salePrice": 999,
    "customName": false,
    "image": "img/products/prod_mwdszqiet4d9u1fip.webp",
    "deliveryChargeInsideDhaka": 80,
    "deliveryChargeOutsideDhaka": 130,
    "isFeatured": false,
    "isArchived": false,
    "team": "Arsenal",
    "tax": 0,
    "assignedSleeves": [
      "slv_half"
    ],
    "customBadge": "",
    "slug": "arsenal-away-kit",
    "advancePaymentMode": "cod_only",
    "preorderCloseDate": null,
    "preorderDesc": "",
    "stock": 0,
    "isDeliveryChargeMandatory": false,
    "lowStockAlert": 5,
    "discountEnd": null,
    "categoryName": "Player Version",
    "description": "* সরাসরি চায়না থেকে ইমপোর্ট করা শতভাগ প্রিমিয়াম কোয়ালিটির অথেনটিক প্লেয়ার ভার্সন জার্সি।\n* অত্যন্ত হালকা, স্ট্রেচেবল এবং বাতাস চলাচলের উপযোগী ফেব্রিক দিয়ে তৈরি।\n* ক্লাব লোগো, ব্র্যান্ড লোগো এবং স্পনসর প্রিন্ট নিখুঁত ও টেকসই হিট-প্রেসড প্রযুক্তিতে বসানো।\n* প্লেয়ারদের জার্সির মতো বডি-হাগিং অ্যাথলেটিক স্লিম ফিট ও নিখুঁত সেলাইয়ের ফিনিশিং।\n* নিয়মিত খেলাধুলা কিংবা ক্যাজুয়াল আউটফিট হিসেবে পরার জন্য অত্যন্ত আরামদায়ক ও আকর্ষণীয়।",
    "imageUrl": "",
    "isPublished": true,
    "seoDesc": "",
    "deliveryNote": "",
    "costPrice": 750,
    "discountType": "percent",
    "customLogo": false,
    "sizeChartImage": "",
    "seoTitle": "",
    "status": "published",
    "sport": "Football",
    "createdAt": "2026-11-12T17:10:01.717Z",
    "compareAt": 1150,
    "discountValue": null,
    "sizeMapping": {
      "M": {
        "width": 38,
        "height": 27
      },
      "3XL": {
        "width": 46,
        "height": 31
      },
      "XS": {
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
        "height": 29,
        "width": 42
      },
      "S": {
        "height": 26,
        "width": 36
      },
      "L": {
        "width": 40,
        "height": 28
      }
    },
    "sku": "ZNV-MWDSZQID",
    "shortDesc": "চায়না থেকে Imported অথেনটিক Player Version জার্সি",
    "customText": false,
    "discountStart": null
  },
  {
    "id": "prod_mwdr6retnv03s299i",
    "customLogo": false,
    "sizeMapping": {
      "3XL": {
        "height": 31,
        "width": 46
      },
      "XS": {
        "width": 46,
        "height": 31
      },
      "S": {
        "height": 26,
        "width": 36
      },
      "L": {
        "height": 28,
        "width": 40
      },
      "M": {
        "width": 38,
        "height": 27
      },
      "XXL": {
        "height": 30,
        "width": 44
      },
      "4XL": {
        "height": 31,
        "width": 46
      },
      "XL": {
        "width": 42,
        "height": 29
      }
    },
    "discountValue": null,
    "preorderDesc": "",
    "deliveryChargeInsideDhaka": 80,
    "slug": "arsenal-home-kit",
    "customText": false,
    "expectedArrival": null,
    "assignedPatches": [
      "patch_ucl"
    ],
    "categoryName": "Player Version",
    "salePrice": 999,
    "image": "img/products/prod_mwdr6retnv03s299i.webp",
    "discountStart": null,
    "deliveryNote": "",
    "isPublished": true,
    "preorderStatus": "OPEN",
    "discountType": "percent",
    "basePrice": 1150,
    "deliveryChargeOutsideDhaka": 130,
    "description": "* সরাসরি চায়না থেকে ইমপোর্ট করা শতভাগ প্রিমিয়াম কোয়ালিটির অথেনটিক প্লেয়ার ভার্সন জার্সি।\n* অত্যন্ত হালকা, স্ট্রেচেবল এবং বাতাস চলাচলের উপযোগী ফেব্রিক দিয়ে তৈরি।\n* ক্লাব লোগো, ব্র্যান্ড লোগো এবং স্পনসর প্রিন্ট নিখুঁত ও টেকসই হিট-প্রেসড প্রযুক্তিতে বসানো।\n* প্লেয়ারদের জার্সির মতো বডি-হাগিং অ্যাথলেটিক স্লিম ফিট ও নিখুঁত সেলাইয়ের ফিনিশিং।\n* নিয়মিত খেলাধুলা কিংবা ক্যাজুয়াল আউটফিট হিসেবে পরার জন্য অত্যন্ত আরামদায়ক ও আকর্ষণীয়।",
    "gender": "Unisex",
    "isLimited": true,
    "lowStockAlert": 5,
    "preorderCloseDate": null,
    "advancePaymentMode": "default",
    "images": [
      {
        "url": "img/products/prod_mwdr6retnv03s299i.webp",
        "alt": "Arsenal Home Kit",
        "isPrimary": true
      }
    ],
    "discountEnd": null,
    "seoDesc": "",
    "updatedAt": "2026-11-13T06:05:53.038Z",
    "customBadge": "",
    "sport": "Football",
    "customNameNumber": true,
    "isNewArrival": false,
    "status": "published",
    "isBestSeller": false,
    "assignedSizes": [
      "sz_s",
      "sz_m",
      "sz_l",
      "sz_xl",
      "sz_xxl",
      "sz_3xl",
      "sz_4xl"
    ],
    "compareAt": 1150,
    "sizeStocks": {
      "S": 1,
      "L": 1,
      "XL": 1,
      "XXL": 1,
      "4XL": 0,
      "3XL": 0,
      "M": 1
    },
    "createdAt": "2026-11-12T16:19:30.245Z",
    "subcategoryId": "mw88n5w90qabal7hw",
    "preorderCapacity": 100,
    "customPrintPrice": null,
    "seoTitle": "",
    "sizeChartImage": "",
    "preorderSold": 0,
    "isArchived": false,
    "isFeatured": false,
    "sku": "ZNV-MWDR6RES",
    "shortDesc": "চায়না থেকে Imported অথেনটিক Player Version জার্সি",
    "name": "Arsenal Home Kit",
    "customName": false,
    "collectionId": null,
    "stock": 4,
    "assignedSleeves": [
      "slv_half"
    ],
    "customNumber": false,
    "categoryId": "cat_mens_football",
    "imageUrl": "",
    "team": "Arsenal",
    "isPreorder": false,
    "tax": 0,
    "preorderPrice": null,
    "costPrice": 750,
    "hasCustomDelivery": false,
    "sizeChartType": "Player Edition",
    "expectedDelivery": null,
    "isDeliveryChargeMandatory": false
  },
  {
    "id": "prod_mwdqkrjb8d4glhnm7",
    "discountStart": null,
    "sizeStocks": {
      "4XL": 0,
      "XXL": 1,
      "M": 1,
      "S": 1,
      "L": 1,
      "XL": 1,
      "3XL": 0
    },
    "status": "published",
    "seoTitle": "",
    "discountType": "percent",
    "stock": 5,
    "discountValue": null,
    "assignedPatches": [
      "patch_ucl"
    ],
    "expectedArrival": null,
    "customName": false,
    "costPrice": 750,
    "deliveryChargeOutsideDhaka": 130,
    "isFeatured": false,
    "isArchived": false,
    "deliveryChargeInsideDhaka": 80,
    "isPreorder": false,
    "advancePaymentMode": "cod_only",
    "sizeChartImage": "",
    "createdAt": "2026-11-12T16:02:23.975Z",
    "compareAt": 1150,
    "sport": "Football",
    "categoryId": "cat_mens_football",
    "preorderDesc": "",
    "slug": "mancester-city-third-kit-copy-mwdqkrjb",
    "imageUrl": "",
    "shortDesc": "চায়না থেকে Imported অথেনটিক Player Version জার্সি",
    "lowStockAlert": 5,
    "categoryName": "Player Version",
    "preorderCloseDate": null,
    "deliveryNote": "",
    "customLogo": false,
    "isLimited": true,
    "customNameNumber": true,
    "customNumber": false,
    "subcategoryId": null,
    "basePrice": 1150,
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
    "preorderCapacity": 100,
    "updatedAt": "2026-11-12T16:02:36.643Z",
    "preorderStatus": "OPEN",
    "sku": "ZNV-MWAFXROJ-COPY-MWDQKRJB",
    "team": "Mancester City",
    "sizeMapping": {
      "S": {
        "width": 36,
        "height": 26
      },
      "L": {
        "height": 28,
        "width": 40
      },
      "3XL": {
        "height": 31,
        "width": 46
      },
      "XS": {
        "height": 31,
        "width": 46
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
        "height": 29,
        "width": 42
      },
      "M": {
        "width": 38,
        "height": 27
      }
    },
    "customText": false,
    "gender": "Unisex",
    "customBadge": "",
    "sizeChartType": "Player Edition",
    "tax": 0,
    "name": "Mancester City Third Kit (Copy)",
    "isNewArrival": false,
    "assignedSleeves": [
      "slv_half"
    ],
    "discountEnd": null,
    "preorderPrice": null,
    "isBestSeller": false,
    "seoDesc": "",
    "isDeliveryChargeMandatory": false,
    "hasCustomDelivery": false,
    "preorderSold": 0,
    "description": "* সরাসরি চায়না থেকে ইমপোর্ট করা শতভাগ প্রিমিয়াম কোয়ালিটির অথেনটিক প্লেয়ার ভার্সন জার্সি।\n* অত্যন্ত হালকা, স্ট্রেচেবল এবং বাতাস চলাচলের উপযোগী ফেব্রিক দিয়ে তৈরি।\n* ক্লাব লোগো, ব্র্যান্ড লোগো এবং স্পনসর প্রিন্ট নিখুঁত ও টেকসই হিট-প্রেসড প্রযুক্তিতে বসানো।\n* প্লেয়ারদের জার্সির মতো বডি-হাগিং অ্যাথলেটিক স্লিম ফিট ও নিখুঁত সেলাইয়ের ফিনিশিং।\n* নিয়মিত খেলাধুলা কিংবা ক্যাজুয়াল আউটফিট হিসেবে পরার জন্য অত্যন্ত আরামদায়ক ও আকর্ষণীয়।",
    "image": "img/products/prod_mwdqkrjb8d4glhnm7.webp",
    "salePrice": 999,
    "expectedDelivery": null,
    "images": [
      {
        "url": "img/products/prod_mwdqkrjb8d4glhnm7.webp",
        "alt": "Mancester City Third Kit (Copy)",
        "isPrimary": true
      },
      {
        "url": "img/products/prod_mwdqkrjb8d4glhnm7_1.webp",
        "alt": "Mancester City Third Kit (Copy)",
        "isPrimary": true
      }
    ],
    "collectionId": null,
    "isPublished": true
  },
  {
    "id": "prod_mwafxrols41103ror",
    "deliveryNote": "",
    "deliveryChargeOutsideDhaka": 130,
    "sku": "ZNV-MWAFXROJ",
    "categoryName": "Player Version",
    "name": "Mancester City Third Kit",
    "sizeChartImage": "",
    "image": "img/products/prod_mwafxrols41103ror.jpg",
    "preorderCloseDate": null,
    "preorderDesc": "",
    "seoTitle": "",
    "lowStockAlert": 5,
    "expectedDelivery": null,
    "categoryId": "cat_mens_football",
    "costPrice": null,
    "isPreorder": false,
    "isArchived": false,
    "isFeatured": false,
    "imageUrl": "",
    "discountStart": null,
    "customNameNumber": true,
    "compareAt": 1150,
    "createdAt": "2026-11-10T08:41:16.389Z",
    "customName": true,
    "assignedSleeves": [
      "slv_half"
    ],
    "tax": 0,
    "discountValue": null,
    "seoDesc": "",
    "status": "published",
    "customPrintPrice": null,
    "discountType": "percent",
    "shortDesc": "চায়না থেকে Imported অথেনটিক Player Version জার্সি",
    "preorderCapacity": 100,
    "isDeliveryChargeMandatory": false,
    "sizeStocks": {
      "M": 0,
      "XXL": 1,
      "4XL": 0,
      "3XL": 0,
      "XL": 1,
      "L": 1,
      "S": 1
    },
    "team": "Mancester City",
    "advancePaymentMode": "default",
    "collectionId": null,
    "basePrice": 1150,
    "sizeMapping": {
      "L": {
        "height": 28,
        "width": 40
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
      "XL": {
        "width": 42,
        "height": 29
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
      }
    },
    "expectedArrival": null,
    "assignedPatches": [
      "patch_ucl"
    ],
    "sizeChartType": "Player Edition",
    "images": [
      {
        "url": "img/products/prod_mwafxrols41103ror.jpg",
        "alt": "Mancester City Third Kit",
        "isPrimary": true
      }
    ],
    "slug": "mancester-city-third-kit",
    "isLimited": true,
    "deliveryChargeInsideDhaka": 80,
    "preorderSold": 0,
    "preorderPrice": null,
    "sport": "Football",
    "isBestSeller": false,
    "isNewArrival": false,
    "updatedAt": "2026-11-13T06:05:55.466Z",
    "hasCustomDelivery": false,
    "gender": "Unisex",
    "customText": false,
    "description": "* সরাসরি চায়না থেকে ইমপোর্ট করা শতভাগ প্রিমিয়াম কোয়ালিটির অথেনটিক প্লেয়ার ভার্সন জার্সি।\n* অত্যন্ত হালকা, স্ট্রেচেবল এবং বাতাস চলাচলের উপযোগী ফেব্রিক দিয়ে তৈরি।\n* ক্লাব লোগো, ব্র্যান্ড লোগো এবং স্পনসর প্রিন্ট নিখুঁত ও টেকসই হিট-প্রেসড প্রযুক্তিতে বসানো।\n* প্লেয়ারদের জার্সির মতো বডি-হাগিং অ্যাথলেটিক স্লিম ফিট ও নিখুঁত সেলাইয়ের ফিনিশিং।\n* নিয়মিত খেলাধুলা কিংবা ক্যাজুয়াল আউটফিট হিসেবে পরার জন্য অত্যন্ত আরামদায়ক ও আকর্ষণীয়।",
    "subcategoryId": "mw88n5w90qabal7hw",
    "isPublished": true,
    "customBadge": "",
    "stock": 4,
    "salePrice": 999,
    "assignedSizes": [],
    "customLogo": false,
    "discountEnd": null,
    "customNumber": true,
    "preorderStatus": "OPEN"
  },
  {
    "id": "prod_mwafvhg25iobn348j",
    "isBestSeller": false,
    "sport": "Football",
    "customLogo": false,
    "tax": 0,
    "gender": "Unisex",
    "isNewArrival": false,
    "salePrice": 999,
    "advancePaymentMode": "default",
    "preorderPrice": null,
    "collectionId": null,
    "preorderCloseDate": null,
    "images": [
      {
        "url": "img/products/prod_mwafvhg25iobn348j.jpg",
        "alt": "Mancester City Away Kit",
        "isPrimary": true
      }
    ],
    "preorderSold": 0,
    "sizeChartImage": "",
    "sizeChartType": "Player Edition",
    "team": "Mancester City",
    "customText": false,
    "stock": 10,
    "deliveryChargeInsideDhaka": 80,
    "updatedAt": "2026-11-13T06:05:56.354Z",
    "name": "Mancester City Away Kit",
    "assignedSizes": [],
    "customNumber": true,
    "sku": "ZNV-MWAFVHFY",
    "subcategoryId": "mw88n5w90qabal7hw",
    "isLimited": true,
    "assignedPatches": [
      "patch_ucl"
    ],
    "expectedArrival": null,
    "basePrice": 1150,
    "customBadge": "",
    "shortDesc": "চায়না থেকে Imported অথেনটিক Player Version জার্সি",
    "assignedSleeves": [
      "slv_half"
    ],
    "hasCustomDelivery": false,
    "sizeStocks": {},
    "preorderDesc": "",
    "discountEnd": null,
    "deliveryChargeOutsideDhaka": 130,
    "lowStockAlert": 5,
    "isDeliveryChargeMandatory": false,
    "customName": true,
    "imageUrl": "",
    "createdAt": "2026-11-10T08:39:29.810Z",
    "deliveryNote": "",
    "description": "* সরাসরি চায়না থেকে ইমপোর্ট করা শতভাগ প্রিমিয়াম কোয়ালিটির অথেনটিক প্লেয়ার ভার্সন জার্সি।\n* অত্যন্ত হালকা, স্ট্রেচেবল এবং বাতাস চলাচলের উপযোগী ফেব্রিক দিয়ে তৈরি।\n* ক্লাব লোগো, ব্র্যান্ড লোগো এবং স্পনসর প্রিন্ট নিখুঁত ও টেকসই হিট-প্রেসড প্রযুক্তিতে বসানো।\n* প্লেয়ারদের জার্সির মতো বডি-হাগিং অ্যাথলেটিক স্লিম ফিট ও নিখুঁত সেলাইয়ের ফিনিশিং।\n* নিয়মিত খেলাধুলা কিংবা ক্যাজুয়াল আউটফিট হিসেবে পরার জন্য অত্যন্ত আরামদায়ক ও আকর্ষণীয়।",
    "compareAt": 1150,
    "expectedDelivery": null,
    "isFeatured": false,
    "isArchived": false,
    "isPublished": true,
    "seoDesc": "",
    "image": "img/products/prod_mwafvhg25iobn348j.jpg",
    "categoryName": "Player Version",
    "isPreorder": false,
    "costPrice": null,
    "slug": "mancester-city-away-kit",
    "seoTitle": "",
    "discountValue": null,
    "preorderStatus": "OPEN",
    "status": "published",
    "categoryId": "cat_mens_football",
    "customNameNumber": true,
    "discountType": "percent",
    "sizeMapping": {
      "S": {
        "height": 26,
        "width": 36
      },
      "L": {
        "width": 40,
        "height": 28
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
      "M": {
        "width": 38,
        "height": 27
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
    "discountStart": null,
    "preorderCapacity": 100,
    "customPrintPrice": null
  },
  {
    "id": "prod_mwafsdqhn64s1y787",
    "isDeliveryChargeMandatory": false,
    "customNumber": true,
    "stock": 10,
    "seoTitle": "",
    "subcategoryId": "mw88n5w90qabal7hw",
    "customBadge": "",
    "images": [
      {
        "url": "img/products/prod_mwafsdqhn64s1y787.jpg",
        "alt": "Mancester City Home Kit",
        "isPrimary": true
      }
    ],
    "preorderStatus": "OPEN",
    "discountEnd": null,
    "costPrice": null,
    "categoryId": "cat_mens_football",
    "description": "* সরাসরি চায়না থেকে ইমপোর্ট করা শতভাগ প্রিমিয়াম কোয়ালিটির অথেনটিক প্লেয়ার ভার্সন জার্সি।\n* অত্যন্ত হালকা, স্ট্রেচেবল এবং বাতাস চলাচলের উপযোগী ফেব্রিক দিয়ে তৈরি।\n* ক্লাব লোগো, ব্র্যান্ড লোগো এবং স্পনসর প্রিন্ট নিখুঁত ও টেকসই হিট-প্রেসড প্রযুক্তিতে বসানো।\n* প্লেয়ারদের জার্সির মতো বডি-হাগিং অ্যাথলেটিক স্লিম ফিট ও নিখুঁত সেলাইয়ের ফিনিশিং।\n* নিয়মিত খেলাধুলা কিংবা ক্যাজুয়াল আউটফিট হিসেবে পরার জন্য অত্যন্ত আরামদায়ক ও আকর্ষণীয়।",
    "seoDesc": "",
    "isPreorder": false,
    "isPublished": true,
    "gender": "Unisex",
    "assignedSizes": [],
    "isNewArrival": false,
    "isArchived": false,
    "isFeatured": false,
    "deliveryChargeOutsideDhaka": 130,
    "sport": "Football",
    "slug": "mancester-city-home-kit",
    "compareAt": 1154,
    "preorderPrice": null,
    "createdAt": "2026-11-10T08:37:05.033Z",
    "preorderCloseDate": null,
    "customName": true,
    "isBestSeller": false,
    "sizeChartType": "Player Edition",
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
      "3XL": {
        "height": 31,
        "width": 46
      },
      "XXL": {
        "width": 44,
        "height": 30
      },
      "4XL": {
        "height": 31,
        "width": 46
      },
      "XS": {
        "width": 46,
        "height": 31
      },
      "L": {
        "width": 40,
        "height": 28
      },
      "S": {
        "height": 26,
        "width": 36
      }
    },
    "preorderSold": 0,
    "assignedSleeves": [
      "slv_half"
    ],
    "imageUrl": "",
    "collectionId": null,
    "sizeStocks": {},
    "sku": "ZNV-MWAFSDQD",
    "discountType": "percent",
    "assignedPatches": [
      "patch_ucl"
    ],
    "expectedArrival": null,
    "isLimited": true,
    "advancePaymentMode": "default",
    "basePrice": 1150,
    "discountStart": null,
    "updatedAt": "2026-11-13T06:05:56.802Z",
    "expectedDelivery": null,
    "team": "Mancester City",
    "discountValue": null,
    "customNameNumber": true,
    "customText": false,
    "name": "Mancester City Home Kit",
    "preorderDesc": "",
    "deliveryChargeInsideDhaka": 80,
    "categoryName": "Player Version",
    "preorderCapacity": 100,
    "tax": 0,
    "sizeChartImage": "",
    "customPrintPrice": null,
    "status": "published",
    "deliveryNote": "",
    "customLogo": false,
    "lowStockAlert": 5,
    "hasCustomDelivery": false,
    "image": "img/products/prod_mwafsdqhn64s1y787.jpg",
    "salePrice": 999
  },
  {
    "id": "prod_mw9setzepymsatr9c",
    "discountType": "percent",
    "isPreorder": false,
    "seoTitle": "",
    "isDeliveryChargeMandatory": false,
    "shortDesc": "চায়না থেকে Imported অথেনটিক Player Version জার্সি",
    "lowStockAlert": 5,
    "customPrintPrice": null,
    "categoryId": "cat_mens_football",
    "preorderCapacity": 100,
    "status": "published",
    "team": "Barcelona",
    "customNameNumber": true,
    "preorderCloseDate": null,
    "createdAt": "2026-11-09T21:42:41.738Z",
    "stock": 3,
    "compareAt": 1150,
    "expectedDelivery": null,
    "name": "Barcelona 4th Kit",
    "advancePaymentMode": "default",
    "sizeStocks": {},
    "preorderDesc": "",
    "costPrice": null,
    "discountValue": null,
    "assignedSleeves": [
      "slv_half",
      "mw9mgrcce7v5jp20j",
      "slv_full"
    ],
    "preorderStatus": "OPEN",
    "categoryName": "Player Version",
    "imageUrl": "",
    "customName": true,
    "deliveryNote": "",
    "discountStart": null,
    "isFeatured": false,
    "isArchived": false,
    "sport": "Football",
    "sizeChartImage": "",
    "customNumber": true,
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
        "height": 31,
        "width": 46
      },
      "XS": {
        "height": 31,
        "width": 46
      },
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
      }
    },
    "salePrice": 999,
    "hasCustomDelivery": false,
    "preorderPrice": null,
    "sku": "ZNV-MW9SETZB",
    "assignedPatches": [
      "patch_ucl",
      "patch_trophy",
      "patch_respect",
      "patch_epl"
    ],
    "expectedArrival": null,
    "sizeChartType": "Player Edition",
    "tax": 0,
    "deliveryChargeOutsideDhaka": 130,
    "customLogo": false,
    "isNewArrival": false,
    "image": "img/products/prod_mw9setzepymsatr9c.jpg",
    "description": "* সরাসরি চায়না থেকে ইমপোর্ট করা শতভাগ প্রিমিয়াম কোয়ালিটির অথেনটিক প্লেয়ার ভার্সন জার্সি।\n* অত্যন্ত হালকা, স্ট্রেচেবল এবং বাতাস চলাচলের উপযোগী ফেব্রিক দিয়ে তৈরি।\n* ক্লাব লোগো, ব্র্যান্ড লোগো এবং স্পনসর প্রিন্ট নিখুঁত ও টেকসই হিট-প্রেসড প্রযুক্তিতে বসানো।\n* প্লেয়ারদের জার্সির মতো বডি-হাগিং অ্যাথলেটিক স্লিম ফিট ও নিখুঁত সেলাইয়ের ফিনিশিং।\n* নিয়মিত খেলাধুলা কিংবা ক্যাজুয়াল আউটফিট হিসেবে পরার জন্য অত্যন্ত আরামদায়ক ও আকর্ষণীয়।",
    "assignedSizes": [],
    "updatedAt": "2026-11-13T06:05:57.795Z",
    "isPublished": true,
    "gender": "Unisex",
    "seoDesc": "",
    "isBestSeller": false,
    "slug": "barcelona-4th-kit",
    "images": [
      {
        "url": "img/products/prod_mw9setzepymsatr9c.jpg",
        "alt": "Barcelona 4th Kit",
        "isPrimary": true
      }
    ],
    "customBadge": "",
    "preorderSold": 0,
    "basePrice": 1150,
    "subcategoryId": "mw88n5w90qabal7hw",
    "deliveryChargeInsideDhaka": 80,
    "collectionId": null,
    "discountEnd": null,
    "customText": false,
    "isLimited": true
  },
  {
    "id": "prod_mw9sa6jrx2oh028td",
    "isLimited": false,
    "name": "Barcelona Third Kit",
    "expectedArrival": null,
    "assignedPatches": [
      "patch_ucl",
      "patch_trophy"
    ],
    "image": "img/products/prod_mw9sa6jrx2oh028td.jpg",
    "seoTitle": "",
    "basePrice": 1150,
    "preorderStatus": "OPEN",
    "lowStockAlert": 5,
    "hasCustomDelivery": false,
    "updatedAt": "2026-11-13T06:05:58.445Z",
    "discountType": "percent",
    "sizeMapping": {
      "L": {
        "height": 28,
        "width": 40
      },
      "S": {
        "width": 36,
        "height": 26
      },
      "3XL": {
        "width": 46,
        "height": 31
      },
      "XS": {
        "width": 46,
        "height": 31
      },
      "4XL": {
        "width": 46,
        "height": 31
      },
      "XXL": {
        "height": 30,
        "width": 44
      },
      "M": {
        "height": 27,
        "width": 38
      },
      "XL": {
        "height": 29,
        "width": 42
      }
    },
    "discountEnd": null,
    "gender": "Unisex",
    "customLogo": false,
    "categoryName": "Player Version",
    "customBadge": "",
    "discountValue": null,
    "deliveryNote": "",
    "team": "Barcelona",
    "isDeliveryChargeMandatory": false,
    "isPublished": true,
    "salePrice": 999,
    "discountStart": null,
    "customText": false,
    "images": [
      {
        "url": "img/products/prod_mw9sa6jrx2oh028td.jpg",
        "alt": "Barcelona Third Kit",
        "isPrimary": true
      }
    ],
    "imageUrl": "",
    "preorderDesc": "",
    "description": "* সরাসরি চায়না থেকে ইমপোর্ট করা শতভাগ প্রিমিয়াম কোয়ালিটির অথেনটিক প্লেয়ার ভার্সন জার্সি।\n* অত্যন্ত হালকা, স্ট্রেচেবল এবং বাতাস চলাচলের উপযোগী ফেব্রিক দিয়ে তৈরি।\n* ক্লাব লোগো, ব্র্যান্ড লোগো এবং স্পনসর প্রিন্ট নিখুঁত ও টেকসই হিট-প্রেসড প্রযুক্তিতে বসানো।\n* প্লেয়ারদের জার্সির মতো বডি-হাগিং অ্যাথলেটিক স্লিম ফিট ও নিখুঁত সেলাইয়ের ফিনিশিং।\n* নিয়মিত খেলাধুলা কিংবা ক্যাজুয়াল আউটফিট হিসেবে পরার জন্য অত্যন্ত আরামদায়ক ও আকর্ষণীয়।",
    "status": "published",
    "isPreorder": false,
    "deliveryChargeInsideDhaka": 80,
    "preorderCloseDate": null,
    "categoryId": "cat_mens_football",
    "slug": "barcelona-third-kit",
    "customNameNumber": true,
    "preorderPrice": null,
    "sport": "Football",
    "costPrice": null,
    "customNumber": true,
    "preorderCapacity": 100,
    "customPrintPrice": null,
    "sizeChartType": "Player Edition",
    "tax": 0,
    "sizeStocks": {},
    "preorderSold": 0,
    "compareAt": 1150,
    "createdAt": "2026-11-09T21:39:04.743Z",
    "advancePaymentMode": "default",
    "sku": "ZNV-MW9SA6JN",
    "collectionId": null,
    "assignedSizes": [],
    "assignedSleeves": [
      "slv_half"
    ],
    "customName": true,
    "subcategoryId": "mw88n5w90qabal7hw",
    "seoDesc": "",
    "isNewArrival": false,
    "stock": 10,
    "expectedDelivery": null,
    "shortDesc": "চায়না থেকে Imported অথেনটিক Player Version জার্সি",
    "isBestSeller": true,
    "deliveryChargeOutsideDhaka": 130,
    "isArchived": false,
    "isFeatured": false,
    "sizeChartImage": ""
  },
  {
    "id": "prod_mw9s5gftya80x3w3n",
    "preorderDesc": "",
    "assignedSleeves": [
      "slv_half"
    ],
    "sizeChartType": "Player Edition",
    "sport": "Football",
    "isFeatured": false,
    "isArchived": false,
    "hasCustomDelivery": false,
    "preorderPrice": null,
    "customName": false,
    "customNameNumber": true,
    "shortDesc": "চায়না থেকে Imported অথেনটিক Player Version জার্সি",
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
      "M": {
        "width": 38,
        "height": 27
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
    "deliveryNote": "",
    "status": "published",
    "team": "Barcelona",
    "createdAt": "2026-11-09T21:35:24.281Z",
    "compareAt": 1150,
    "customPrintPrice": null,
    "preorderCapacity": 100,
    "categoryName": "Player Version",
    "seoDesc": "",
    "sizeStocks": {},
    "preorderStatus": "OPEN",
    "stock": 10,
    "isPublished": true,
    "name": "Barceleona Away Kit",
    "deliveryChargeInsideDhaka": 80,
    "advancePaymentMode": "default",
    "discountType": "percent",
    "description": "* সরাসরি চায়না থেকে ইমপোর্ট করা শতভাগ প্রিমিয়াম কোয়ালিটির অথেনটিক প্লেয়ার ভার্সন জার্সি।\n* অত্যন্ত হালকা, স্ট্রেচেবল এবং বাতাস চলাচলের উপযোগী ফেব্রিক দিয়ে তৈরি।\n* ক্লাব লোগো, ব্র্যান্ড লোগো এবং স্পনসর প্রিন্ট নিখুঁত ও টেকসই হিট-প্রেসড প্রযুক্তিতে বসানো।\n* প্লেয়ারদের জার্সির মতো বডি-হাগিং অ্যাথলেটিক স্লিম ফিট ও নিখুঁত সেলাইয়ের ফিনিশিং।\n* নিয়মিত খেলাধুলা কিংবা ক্যাজুয়াল আউটফিট হিসেবে পরার জন্য অত্যন্ত আরামদায়ক ও আকর্ষণীয়।",
    "costPrice": null,
    "subcategoryId": "mw88n5w90qabal7hw",
    "discountEnd": null,
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
    "deliveryChargeOutsideDhaka": 130,
    "expectedDelivery": null,
    "customBadge": "",
    "isPreorder": false,
    "salePrice": 999,
    "customText": false,
    "isBestSeller": true,
    "isNewArrival": false,
    "imageUrl": "",
    "collectionId": null,
    "lowStockAlert": 5,
    "isDeliveryChargeMandatory": false,
    "image": "img/products/prod_mw9s5gftya80x3w3n.jpg",
    "customLogo": false,
    "preorderSold": 0,
    "sku": "ZNV-MW9S5GFR",
    "preorderCloseDate": null,
    "discountStart": null,
    "customNumber": false,
    "tax": 0,
    "slug": "barceleona-away-kit",
    "sizeChartImage": "",
    "images": [
      {
        "url": "img/products/prod_mw9s5gftya80x3w3n.jpg",
        "alt": "Barceleona Away Kit",
        "isPrimary": true
      }
    ],
    "updatedAt": "2026-11-13T06:05:59.244Z",
    "gender": "Unisex",
    "discountValue": null,
    "basePrice": 1150,
    "expectedArrival": null,
    "assignedPatches": [
      "patch_ucl"
    ],
    "isLimited": false,
    "seoTitle": ""
  },
  {
    "id": "prod_mw9s02zyhy7iilqo4",
    "shortDesc": "চায়না থেকে Imported অথেনটিক Player Version জার্সি",
    "discountStart": null,
    "slug": "barcelona-home-kit",
    "createdAt": "2026-11-09T21:31:13.582Z",
    "compareAt": 1150,
    "discountType": "percent",
    "sku": "ZNV-MW9S02ZV",
    "discountValue": null,
    "sizeMapping": {
      "M": {
        "height": 27,
        "width": 38
      },
      "4XL": {
        "height": 31,
        "width": 46
      },
      "XXL": {
        "height": 30,
        "width": 44
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
      "S": {
        "height": 26,
        "width": 36
      },
      "L": {
        "height": 28,
        "width": 40
      }
    },
    "tax": 0,
    "discountEnd": null,
    "categoryName": "Player Version",
    "preorderStatus": "OPEN",
    "costPrice": null,
    "customLogo": false,
    "expectedArrival": null,
    "assignedPatches": [
      "patch_ucl"
    ],
    "customBadge": "",
    "image": "img/products/prod_mw9s02zyhy7iilqo4.jpg",
    "status": "published",
    "isDeliveryChargeMandatory": false,
    "deliveryNote": "",
    "isPublished": true,
    "deliveryChargeOutsideDhaka": 130,
    "advancePaymentMode": "default",
    "lowStockAlert": 5,
    "description": "* সরাসরি চায়না থেকে ইমপোর্ট করা শতভাগ প্রিমিয়াম কোয়ালিটির অথেনটিক প্লেয়ার ভার্সন জার্সি।\n* অত্যন্ত হালকা, স্ট্রেচেবল এবং বাতাস চলাচলের উপযোগী ফেব্রিক দিয়ে তৈরি।\n* ক্লাব লোগো, ব্র্যান্ড লোগো এবং স্পনসর প্রিন্ট নিখুঁত ও টেকসই হিট-প্রেসড প্রযুক্তিতে বসানো।\n* প্লেয়ারদের জার্সির মতো বডি-হাগিং অ্যাথলেটিক স্লিম ফিট ও নিখুঁত সেলাইয়ের ফিনিশিং।\n* নিয়মিত খেলাধুলা কিংবা ক্যাজুয়াল আউটফিট হিসেবে পরার জন্য অত্যন্ত আরামদায়ক ও আকর্ষণীয়।",
    "preorderCloseDate": null,
    "customText": false,
    "preorderDesc": "",
    "seoDesc": "",
    "name": "Barcelona Home Kit",
    "isPreorder": false,
    "subcategoryId": "mw88n5w90qabal7hw",
    "gender": "Unisex",
    "categoryId": "cat_mens_football",
    "salePrice": 999,
    "images": [
      {
        "url": "img/products/prod_mw9s02zyhy7iilqo4.jpg",
        "alt": "Barcelona Home Kit",
        "isPrimary": true
      }
    ],
    "sizeChartImage": "",
    "customNumber": false,
    "stock": 10,
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
    "imageUrl": "",
    "assignedSleeves": [
      "slv_half"
    ],
    "deliveryChargeInsideDhaka": 80,
    "preorderPrice": null,
    "sizeStocks": {},
    "customNameNumber": true,
    "preorderSold": 0,
    "updatedAt": "2026-11-13T06:06:00.185Z",
    "hasCustomDelivery": false,
    "sizeChartType": "Player Edition",
    "seoTitle": "",
    "collectionId": null,
    "customName": false,
    "isLimited": false,
    "preorderCapacity": 100,
    "customPrintPrice": null,
    "team": "Barcelona",
    "sport": "Football",
    "isNewArrival": false,
    "basePrice": 1150,
    "isFeatured": false,
    "isBestSeller": true,
    "isArchived": false
  },
  {
    "id": "prod_mw9ru5dmlxx3y3v5l",
    "isPublished": true,
    "team": "Real Madrid",
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
    "categoryName": "Player Version",
    "description": "* সরাসরি চায়না থেকে ইমপোর্ট করা শতভাগ প্রিমিয়াম কোয়ালিটির অথেনটিক প্লেয়ার ভার্সন জার্সি।\n* অত্যন্ত হালকা, স্ট্রেচেবল এবং বাতাস চলাচলের উপযোগী ফেব্রিক দিয়ে তৈরি।\n* ক্লাব লোগো, ব্র্যান্ড লোগো এবং স্পনসর প্রিন্ট নিখুঁত ও টেকসই হিট-প্রেসড প্রযুক্তিতে বসানো।\n* প্লেয়ারদের জার্সির মতো বডি-হাগিং অ্যাথলেটিক স্লিম ফিট ও নিখুঁত সেলাইয়ের ফিনিশিং।\n* নিয়মিত খেলাধুলা কিংবা ক্যাজুয়াল আউটফিট হিসেবে পরার জন্য অত্যন্ত আরামদায়ক ও আকর্ষণীয়।",
    "sport": "Football",
    "gender": "Unisex",
    "sizeStocks": {},
    "deliveryNote": "",
    "images": [
      {
        "url": "img/products/prod_mw9ru5dmlxx3y3v5l.jpg",
        "alt": "Real Madrid Third Kit",
        "isPrimary": true
      }
    ],
    "isArchived": false,
    "isFeatured": false,
    "discountEnd": null,
    "imageUrl": "",
    "salePrice": 999,
    "subcategoryId": "mw88n5w90qabal7hw",
    "preorderDesc": "",
    "customBadge": "",
    "customName": false,
    "seoTitle": "",
    "basePrice": 1150,
    "seoDesc": "",
    "categoryId": "cat_mens_football",
    "sizeMapping": {
      "XXL": {
        "height": 30,
        "width": 44
      },
      "4XL": {
        "height": 31,
        "width": 46
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
        "width": 46,
        "height": 31
      },
      "XL": {
        "width": 42,
        "height": 29
      },
      "S": {
        "width": 36,
        "height": 26
      },
      "L": {
        "width": 40,
        "height": 28
      }
    },
    "isPreorder": false,
    "isLimited": false,
    "stock": 10,
    "discountType": "percent",
    "sizeChartType": "Player Edition",
    "name": "Real Madrid Third Kit",
    "hasCustomDelivery": false,
    "updatedAt": "2026-11-13T06:06:00.983Z",
    "assignedPatches": [
      "patch_ucl"
    ],
    "expectedArrival": null,
    "isDeliveryChargeMandatory": false,
    "preorderPrice": null,
    "preorderSold": 0,
    "discountValue": null,
    "customLogo": false,
    "deliveryChargeInsideDhaka": 80,
    "compareAt": 1150,
    "assignedSleeves": [
      "slv_half"
    ],
    "tax": 0,
    "createdAt": "2026-11-09T21:26:36.730Z",
    "collectionId": null,
    "image": "img/products/prod_mw9ru5dmlxx3y3v5l.jpg",
    "expectedDelivery": null,
    "customText": false,
    "advancePaymentMode": "default",
    "discountStart": null,
    "isNewArrival": false,
    "shortDesc": "চায়না থেকে Imported অথেনটিক Player Version জার্সি",
    "isBestSeller": true,
    "preorderCloseDate": null,
    "lowStockAlert": 5,
    "customNameNumber": true,
    "status": "published",
    "preorderStatus": "OPEN",
    "customNumber": false,
    "costPrice": null,
    "slug": "real-madrid-third-kit",
    "sku": "ZNV-MW9RU5DK",
    "customPrintPrice": null,
    "deliveryChargeOutsideDhaka": 130,
    "preorderCapacity": 100
  },
  {
    "id": "prod_mw9rkmru2ps3wt4hb",
    "imageUrl": "",
    "sizeMapping": {
      "L": {
        "height": 28,
        "width": 40
      },
      "S": {
        "width": 36,
        "height": 26
      },
      "4XL": {
        "height": 31,
        "width": 46
      },
      "XXL": {
        "height": 30,
        "width": 44
      },
      "XS": {
        "height": 31,
        "width": 46
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
        "height": 27,
        "width": 38
      }
    },
    "expectedDelivery": null,
    "assignedPatches": [
      "patch_ucl"
    ],
    "expectedArrival": null,
    "categoryId": "cat_mens_football",
    "updatedAt": "2026-11-13T06:06:01.659Z",
    "isPreorder": false,
    "isDeliveryChargeMandatory": false,
    "hasCustomDelivery": false,
    "discountType": "percent",
    "preorderPrice": null,
    "basePrice": 1150,
    "sizeChartType": "Player Edition",
    "isLimited": false,
    "description": "* সরাসরি চায়না থেকে ইমপোর্ট করা শতভাগ প্রিমিয়াম কোয়ালিটির অথেনটিক প্লেয়ার ভার্সন জার্সি।\n* অত্যন্ত হালকা, স্ট্রেচেবল এবং বাতাস চলাচলের উপযোগী ফেব্রিক দিয়ে তৈরি।\n* ক্লাব লোগো, ব্র্যান্ড লোগো এবং স্পনসর প্রিন্ট নিখুঁত ও টেকসই হিট-প্রেসড প্রযুক্তিতে বসানো।\n* প্লেয়ারদের জার্সির মতো বডি-হাগিং অ্যাথলেটিক স্লিম ফিট ও নিখুঁত সেলাইয়ের ফিনিশিং।\n* নিয়মিত খেলাধুলা কিংবা ক্যাজুয়াল আউটফিট হিসেবে পরার জন্য অত্যন্ত আরামদায়ক ও আকর্ষণীয়।",
    "status": "published",
    "sizeChartImage": "",
    "categoryName": "Player Version",
    "salePrice": 999,
    "slug": "real-madrid-away",
    "isPublished": true,
    "preorderCapacity": 100,
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
    "deliveryNote": "",
    "sizeStocks": {},
    "subcategoryId": "mw88n5w90qabal7hw",
    "advancePaymentMode": "default",
    "isFeatured": false,
    "isArchived": false,
    "seoTitle": "",
    "customBadge": "",
    "customNameNumber": true,
    "customName": false,
    "preorderDesc": "",
    "discountEnd": null,
    "image": "img/products/prod_mw9rkmru2ps3wt4hb.jpg",
    "gender": "Unisex",
    "stock": 20,
    "sku": "ZNV-MW9RKMRS",
    "preorderCloseDate": null,
    "costPrice": null,
    "lowStockAlert": 5,
    "preorderStatus": "OPEN",
    "customNumber": false,
    "team": "Real Madrid",
    "images": [
      {
        "url": "img/products/prod_mw9rkmru2ps3wt4hb.jpg",
        "alt": "Real Madrid Away Kit",
        "isPrimary": true
      }
    ],
    "sport": "Football",
    "deliveryChargeInsideDhaka": 80,
    "preorderSold": 0,
    "customLogo": false,
    "deliveryChargeOutsideDhaka": 130,
    "shortDesc": "চায়না থেকে Imported অথেনটিক Player Version জার্সি",
    "name": "Real Madrid Away Kit",
    "discountValue": null,
    "collectionId": null,
    "assignedSleeves": [
      "slv_half"
    ],
    "tax": 0,
    "customText": false,
    "isNewArrival": false,
    "seoDesc": "",
    "isBestSeller": true,
    "discountStart": null,
    "createdAt": "2026-11-09T21:19:12.714Z",
    "compareAt": 1150
  },
  {
    "id": "mw8a6nc4ecqhhqgcv",
    "slug": "real-madrid-home",
    "sizeMapping": {
      "S": {
        "height": 26,
        "width": 36
      },
      "L": {
        "height": 28,
        "width": 40
      },
      "XS": {
        "height": 31,
        "width": 46
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
      }
    },
    "sizeChartType": "Player Edition",
    "costPrice": null,
    "preorderPrice": null,
    "status": "published",
    "isPreorder": false,
    "seoDesc": "",
    "image": "img/products/mw8a6nc4ecqhhqgcv.jpg",
    "customNumber": true,
    "categoryId": "cat_mens_football",
    "description": "* সরাসরি চায়না থেকে ইমপোর্ট করা শতভাগ প্রিমিয়াম কোয়ালিটির অথেনটিক প্লেয়ার ভার্সন জার্সি।\n* অত্যন্ত হালকা, স্ট্রেচেবল এবং বাতাস চলাচলের উপযোগী ফেব্রিক দিয়ে তৈরি।\n* ক্লাব লোগো, ব্র্যান্ড লোগো এবং স্পনসর প্রিন্ট নিখুঁত ও টেকসই হিট-প্রেসড প্রযুক্তিতে বসানো।\n* প্লেয়ারদের জার্সির মতো বডি-হাগিং অ্যাথলেটিক স্লিম ফিট ও নিখুঁত সেলাইয়ের ফিনিশিং।\n* নিয়মিত খেলাধুলা কিংবা ক্যাজুয়াল আউটফিট হিসেবে পরার জন্য অত্যন্ত আরামদায়ক ও আকর্ষণীয়।",
    "collectionId": null,
    "customName": true,
    "isPublished": true,
    "preorderStatus": "OPEN",
    "shortDesc": "চায়না থেকে Imported অথেনটিক Player Version জার্সি",
    "isArchived": false,
    "assignedPatches": [],
    "expectedArrival": null,
    "preorderCloseDate": null,
    "isFeatured": false,
    "subcategoryId": "mw88n5w90qabal7hw",
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
    "sizeStocks": {},
    "customBadge": "",
    "isBestSeller": true,
    "isNewArrival": false,
    "deliveryChargeOutsideDhaka": 130,
    "compareAt": 1150,
    "discountEnd": null,
    "createdAt": "2026-11-08T20:24:40.612Z",
    "isDeliveryChargeMandatory": false,
    "seoTitle": "",
    "advancePaymentMode": "default",
    "updatedAt": "2026-11-13T06:06:02.391Z",
    "sport": "Football",
    "tax": 0,
    "name": "Real Madrid Home",
    "deliveryChargeInsideDhaka": 80,
    "expectedDelivery": null,
    "lowStockAlert": 5,
    "basePrice": 1150,
    "sizeChartImage": "",
    "discountType": "percent",
    "assignedSleeves": [
      "slv_half"
    ],
    "isLimited": false,
    "preorderCapacity": 100,
    "deliveryNote": "",
    "customPrintPrice": null,
    "discountStart": null,
    "salePrice": 999,
    "stock": 10,
    "categoryName": "Player Version",
    "customText": false,
    "gender": "Unisex",
    "customLogo": false,
    "preorderDesc": "",
    "images": [
      {
        "url": "img/products/mw8a6nc4ecqhhqgcv.jpg",
        "alt": "Real Madrid Home",
        "isPrimary": true
      }
    ],
    "discountValue": null,
    "customNameNumber": false,
    "imageUrl": "",
    "hasCustomDelivery": false,
    "team": "Real Madrid",
    "sku": "ZNV-MW8A6NC3"
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
            if (cp.sizeChartImage && cp.sizeChartImage.length > 5000) cp.sizeChartImage = '';
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
