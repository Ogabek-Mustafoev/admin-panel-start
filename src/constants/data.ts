import type { ICategory } from "@/schema/category";

export const PREDEFINED_COLORS = [
  "#355872", // Original
  "#1677ff", // Blue
  "#722ed1", // Purple
  "#fa8c16", // Orange
];

export const PREDEFINED_BG_COLORS = {
  light: ["#fdf8f1", "#f0f2f5"],
  dark: ["#111", "#222"],
};

export const GLASS = {
  light: {
    bg: "rgba(255, 255, 255, 0.45)",
    bgElevated: "rgba(255, 255, 255, 0.55)",
    border: "rgba(255, 255, 255, 0.3)",
    menuHoverBg: "rgba(255, 255, 255, 0.15)",
    menuSelectedBg: "rgba(255, 255, 255, 0.25)",
    menuSubBg: "rgba(255, 255, 255, 0.1)",
    menuPopupBg: "rgba(255, 255, 255, 0.75)",
    menuGroupTitle: "rgba(255, 255, 255, 0.5)",
  },
  dark: {
    bg: "rgba(20, 20, 20, 0.45)",
    bgElevated: "rgba(30, 30, 30, 0.55)",
    border: "rgba(255, 255, 255, 0.08)",
    menuHoverBg: "rgba(255, 255, 255, 0.08)",
    menuSelectedBg: "rgba(255, 255, 255, 0.15)",
    menuSubBg: "rgba(0, 0, 0, 0.2)",
    menuPopupBg: "rgba(30, 30, 30, 0.85)",
    menuGroupTitle: "rgba(255, 255, 255, 0.3)",
  },
};

export const STATUSES = [
  { value: true, label: "active" },
  { value: false, label: "inactive" },
];

export const mockCategories: ICategory[] = [
  {
    id: 1,
    name: { uz: "Ayollar", en: "Women", ru: "Женщины" },
    image_url: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400",
    mobile_image_url: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=200",
    parent_id: null,
    is_active: true,
    created_at: "2024-01-01",
    updated_at: "2024-01-01",
    children: [
      {
        id: 2,
        name: { uz: "Kiyim", en: "Clothing", ru: "Одежда" },
        image_url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
        mobile_image_url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200",
        parent_id: 1,
        is_active: true,
        created_at: "2024-01-01",
        updated_at: "2024-01-01",
        children: [
          {
            id: 3,
            name: { uz: "Ko'ylaklar", en: "Dresses", ru: "Платья" },
            image_url: "https://images.unsplash.com/photo-1612336307429-8a898d10e223?w=400",
            mobile_image_url: "https://images.unsplash.com/photo-1612336307429-8a898d10e223?w=200",
            parent_id: 2,
            is_active: true,
            created_at: "2024-01-01",
            updated_at: "2024-01-01",
            children: [],
          },
          {
            id: 4,
            name: { uz: "Bluzalar", en: "Blouses", ru: "Блузки" },
            image_url: "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=400",
            mobile_image_url: "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=200",
            parent_id: 2,
            is_active: true,
            created_at: "2024-01-01",
            updated_at: "2024-01-01",
            children: [],
          },
          {
            id: 5,
            name: { uz: "Shimlar", en: "Pants", ru: "Брюки" },
            image_url: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400",
            mobile_image_url: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=200",
            parent_id: 2,
            is_active: true,
            created_at: "2024-01-01",
            updated_at: "2024-01-01",
            children: [],
          },
        ],
      },
      {
        id: 6,
        name: { uz: "Poyabzal", en: "Footwear", ru: "Обувь" },
        image_url: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400",
        mobile_image_url: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=200",
        parent_id: 1,
        is_active: true,
        created_at: "2024-01-01",
        updated_at: "2024-01-01",
        children: [
          {
            id: 7,
            name: { uz: "Tuflilar", en: "Heels", ru: "Туфли" },
            image_url: "https://images.unsplash.com/photo-1518049362265-d5b2a6467637?w=400",
            mobile_image_url: "https://images.unsplash.com/photo-1518049362265-d5b2a6467637?w=200",
            parent_id: 6,
            is_active: true,
            created_at: "2024-01-01",
            updated_at: "2024-01-01",
            children: [],
          },
          {
            id: 8,
            name: { uz: "Krossovkalar", en: "Sneakers", ru: "Кроссовки" },
            image_url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
            mobile_image_url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200",
            parent_id: 6,
            is_active: true,
            created_at: "2024-01-01",
            updated_at: "2024-01-01",
            children: [],
          },
        ],
      },
    ],
  },
  {
    id: 9,
    name: { uz: "Erkaklar", en: "Men", ru: "Мужчины" },
    image_url: "https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=400",
    mobile_image_url: "https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=200",
    parent_id: null,
    is_active: true,
    created_at: "2024-01-01",
    updated_at: "2024-01-01",
    children: [
      {
        id: 10,
        name: { uz: "Kiyim", en: "Clothing", ru: "Одежда" },
        image_url: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=400",
        mobile_image_url: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=200",
        parent_id: 9,
        is_active: true,
        created_at: "2024-01-01",
        updated_at: "2024-01-01",
        children: [
          {
            id: 11,
            name: { uz: "Kostyumlar", en: "Suits", ru: "Костюмы" },
            image_url: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400",
            mobile_image_url: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=200",
            parent_id: 10,
            is_active: true,
            created_at: "2024-01-01",
            updated_at: "2024-01-01",
            children: [],
          },
          {
            id: 12,
            name: { uz: "Ko'ylaklar", en: "Shirts", ru: "Рубашки" },
            image_url: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400",
            mobile_image_url: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=200",
            parent_id: 10,
            is_active: true,
            created_at: "2024-01-01",
            updated_at: "2024-01-01",
            children: [],
          },
        ],
      },
    ],
  },
  {
    id: 13,
    name: { uz: "Bolalar", en: "Kids", ru: "Дети" },
    image_url: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=400",
    mobile_image_url: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=200",
    parent_id: null,
    is_active: true,
    created_at: "2024-01-01",
    updated_at: "2024-01-01",
    children: [
      {
        id: 14,
        name: { uz: "Kiyim", en: "Clothing", ru: "Одежда" },
        image_url: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=400",
        mobile_image_url: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=200",
        parent_id: 13,
        is_active: true,
        created_at: "2024-01-01",
        updated_at: "2024-01-01",
        children: [
          {
            id: 15,
            name: { uz: "Ko'ylaklar", en: "Dresses", ru: "Платья" },
            image_url: "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=400",
            mobile_image_url: "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=200",
            parent_id: 14,
            is_active: true,
            created_at: "2024-01-01",
            updated_at: "2024-01-01",
            children: [],
          },
        ],
      },
    ],
  },
];
