# QR Menu

منيو إلكتروني خفيف بـ React + Tailwind، كل محتواه بملف واحد.

## التشغيل

```bash
npm install
npm run dev
```

## لزبون جديد

1. عدّل `src/data/menu.json`: الاسم، الألوان، الأقسام، الأصناف، الأسعار.
2. حط الصور (WebP، أقل من 100KB) بـ `public/images/` واكتب بالـ JSON `"image": "images/latte.webp"`.
3. لإخفاء صنف خلصان: `"available": false`.

## النشر على GitHub Pages

1. ارفع المشروع على repo بالفرع `main`.
2. من Settings > Pages، اختار Source: **GitHub Actions**.
3. كل push بيبني الموقع وبينشره تلقائياً.

## الطلبات (`ordering` بالـ JSON)

- `enabled`: تشغيل أو إيقاف الطلب كلياً (لو `false` بيصير منيو عرض بس).
- `whatsapp`: رقم المحل بصيغة دولية بدون + (مثلاً `963912345678`).
- `dineIn` / `pickup` / `delivery`: أنواع الطلب المتاحة.
- `dineInMode`: `"whatsapp"` الطلب بيوصل لواتساب الكاشير، أو `"show"` الزبون بيعرض الطلب على شاشته للنادل.
- `deliveryFee`: رسوم التوصيل (0 = بدون).

## QR لكل طاولة

اعمل لكل طاولة QR لرابط فيه رقمها، مثلاً: `https://user.github.io/menu/?table=5`
فبيطلع نوع الطلب "داخل المحل" ورقم الطاولة معبّى تلقائياً.
