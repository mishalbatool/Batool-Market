import React, { useState, useRef } from 'react';
import { Product, StoreSettings, Category } from '../types';
import { formatPKR, generateGeneralWhatsAppUrl } from '../utils/whatsapp';
import { compressImageFile } from '../utils/imageHelper';
import {
  X,
  Plus,
  Save,
  RotateCcw,
  Sparkles,
  Phone,
  Image as ImageIcon,
  DollarSign,
  PackagePlus,
  Check,
  UploadCloud,
  Trash2,
  Edit3,
  ExternalLink,
  Search,
  AlertCircle,
  Tag,
  Camera,
} from 'lucide-react';

interface StoreOwnerModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: StoreSettings;
  onUpdateSettings: (newSettings: StoreSettings) => void;
  products: Product[];
  onUpdateProducts: (newProducts: Product[]) => void;
  categories: Category[];
  onResetDefaults: () => void;
  initialTab?: 'add' | 'prices' | 'whatsapp' | 'logo';
}

export const StoreOwnerModal: React.FC<StoreOwnerModalProps> = ({
  isOpen,
  onClose,
  settings,
  onUpdateSettings,
  products,
  onUpdateProducts,
  categories,
  onResetDefaults,
  initialTab = 'add',
}) => {
  const [activeTab, setActiveTab] = useState<'add' | 'prices' | 'whatsapp' | 'logo'>(initialTab);

  // WhatsApp & general settings state
  const [waNumber, setWaNumber] = useState(settings.whatsappNumber);
  const [waDisplay, setWaDisplay] = useState(settings.whatsappDisplayNumber);
  const [logoUrl, setLogoUrl] = useState(settings.customLogoUrl || '');
  const [saveSuccessMessage, setSaveSuccessMessage] = useState('');

  // Editing existing prices & products
  const [editableProducts, setEditableProducts] = useState<Product[]>(products);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productSearch, setProductSearch] = useState('');

  // New product form state
  const [newTitle, setNewTitle] = useState('');
  const [newPrice, setNewPrice] = useState<number | ''>(2500);
  const [newOriginalPrice, setNewOriginalPrice] = useState<number | ''>(3200);
  const [newCategory, setNewCategory] = useState(categories[0]?.name || "Women's Clothing");
  const [customCategory, setCustomCategory] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newSizes, setNewSizes] = useState('Small, Medium, Large');
  const [newColors, setNewColors] = useState('Emerald Green, Maroon, Black');
  const [newImages, setNewImages] = useState<string[]>([
    'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
  ]);
  const [imageUrlInput, setImageUrlInput] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  // File inputs
  const fileInputRef = useRef<HTMLInputElement>(null);
  const editFileInputRef = useRef<HTMLInputElement>(null);
  const logoFileInputRef = useRef<HTMLInputElement>(null);

  // Keep local editableProducts synced when modal opens or products update
  React.useEffect(() => {
    setEditableProducts(products);
  }, [products, isOpen]);

  // Keep WhatsApp synced when settings update
  React.useEffect(() => {
    setWaNumber(settings.whatsappNumber);
    setWaDisplay(settings.whatsappDisplayNumber);
    setLogoUrl(settings.customLogoUrl || '');
  }, [settings, isOpen]);

  if (!isOpen) return null;

  // Handle image upload from computer/phone for NEW product
  const handleImageFilesUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    try {
      const uploadedUrls: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const compressedDataUrl = await compressImageFile(files[i]);
        uploadedUrls.push(compressedDataUrl);
      }

      setNewImages((prev) => {
        // If the only current image is the default placeholder, replace it
        if (
          prev.length === 1 &&
          prev[0].includes('unsplash.com/photo-1610030469983-98e550d6193c')
        ) {
          return uploadedUrls;
        }
        return [...prev, ...uploadedUrls];
      });
      setSaveSuccessMessage(`${files.length} photo(s) uploaded successfully!`);
      setTimeout(() => setSaveSuccessMessage(''), 2500);
    } catch (err) {
      console.error('Error reading image files', err);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  // Add image by URL
  const handleAddImageUrl = () => {
    if (!imageUrlInput.trim()) return;
    setNewImages((prev) => [...prev, imageUrlInput.trim()]);
    setImageUrlInput('');
  };

  // Remove an image from new product
  const handleRemoveImage = (index: number) => {
    setNewImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Set cover picture
  const handleSetCoverImage = (index: number) => {
    setNewImages((prev) => {
      const copy = [...prev];
      const [item] = copy.splice(index, 1);
      return [item, ...copy];
    });
  };

  // Handle image upload for product currently being EDITED
  const handleEditProductImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editingProduct) return;
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    try {
      const uploadedUrls: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const compressed = await compressImageFile(files[i]);
        uploadedUrls.push(compressed);
      }
      setEditingProduct({
        ...editingProduct,
        images: [...editingProduct.images, ...uploadedUrls],
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsUploading(false);
      if (editFileInputRef.current) editFileInputRef.current.value = '';
    }
  };

  // Handle Logo upload
  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const compressed = await compressImageFile(file, 400, 400, 0.9);
      setLogoUrl(compressed);
    } catch (err) {
      console.error(err);
    }
  };

  // Save new product
  const handleAddNewProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const finalCategory =
      newCategory === 'custom' && customCategory.trim()
        ? customCategory.trim()
        : newCategory;

    const finalImages =
      newImages.length > 0
        ? newImages
        : ['https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80'];

    const newProd: Product = {
      id: `bm-prod-${Date.now()}`,
      name: newTitle.trim(),
      price: Number(newPrice) || 1000,
      originalPrice: newOriginalPrice ? Number(newOriginalPrice) : undefined,
      category: finalCategory,
      images: finalImages,
      description:
        newDesc.trim() ||
        'Handpicked quality product from Batool Market. Includes Free Delivery across Pakistan and 100% Cash on Delivery (COD).',
      sizes: newSizes
        ? newSizes
            .split(',')
            .map((s) => s.trim())
            .filter(Boolean)
        : undefined,
      colors: newColors
        ? newColors
            .split(',')
            .map((c) => c.trim())
            .filter(Boolean)
        : undefined,
      inStock: true,
      isFeatured: true,
      freeDelivery: true,
      cashOnDelivery: true,
    };

    const updated = [newProd, ...products];
    setEditableProducts(updated);
    onUpdateProducts(updated);

    // Reset inputs
    setNewTitle('');
    setNewDesc('');
    setNewPrice(2500);
    setNewOriginalPrice(3200);
    setNewImages([
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
    ]);
    setSaveSuccessMessage(`🎉 Product "${newProd.name}" added successfully with your pictures & price!`);
    setTimeout(() => setSaveSuccessMessage(''), 3000);
    setActiveTab('prices');
  };

  // Save edited product
  const handleSaveEditedProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    const updated = products.map((p) =>
      p.id === editingProduct.id ? editingProduct : p
    );
    setEditableProducts(updated);
    onUpdateProducts(updated);
    setEditingProduct(null);
    setSaveSuccessMessage(`Updated "${editingProduct.name}" details!`);
    setTimeout(() => setSaveSuccessMessage(''), 2500);
  };

  // Delete product
  const handleDeleteProduct = (productId: string, productName: string) => {
    if (window.confirm(`Are you sure you want to remove "${productName}" from Batool Market?`)) {
      const updated = products.filter((p) => p.id !== productId);
      setEditableProducts(updated);
      onUpdateProducts(updated);
      if (editingProduct?.id === productId) {
        setEditingProduct(null);
      }
      setSaveSuccessMessage(`Removed "${productName}"`);
      setTimeout(() => setSaveSuccessMessage(''), 2500);
    }
  };

  // Quick Inline Price Change
  const handlePriceChange = (productId: string, newPriceVal: number) => {
    setEditableProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, price: newPriceVal } : p))
    );
  };

  const handleSaveAllPrices = () => {
    onUpdateProducts(editableProducts);
    setSaveSuccessMessage('All selling prices updated and saved successfully!');
    setTimeout(() => setSaveSuccessMessage(''), 2500);
  };

  // Save WhatsApp settings
  const handleSaveGeneralSettings = (e: React.FormEvent) => {
    e.preventDefault();

    // Clean number
    let clean = waNumber.replace(/[^0-9]/g, '');
    if (clean.startsWith('0')) {
      clean = '92' + clean.substring(1);
    } else if (!clean.startsWith('92')) {
      clean = '92' + clean;
    }

    onUpdateSettings({
      ...settings,
      whatsappNumber: clean,
      whatsappDisplayNumber: waDisplay.trim() || '0301-5954967',
      customLogoUrl: logoUrl.trim() || undefined,
    });
    setSaveSuccessMessage('WhatsApp contact & store settings saved!');
    setTimeout(() => setSaveSuccessMessage(''), 2500);
  };

  const filteredProductsToEdit = editableProducts.filter((p) => {
    if (!productSearch.trim()) return true;
    const q = productSearch.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      String(p.price).includes(q)
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] shadow-2xl border border-stone-200 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-stone-900 text-white p-4 sm:p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-800 text-amber-300">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold font-serif flex items-center gap-2">
                <span>Batool Market Owner Portal</span>
                <span className="text-[11px] font-sans font-semibold bg-emerald-700/80 text-emerald-100 px-2 py-0.5 rounded-full">
                  Admin Setup
                </span>
              </h2>
              <p className="text-xs text-stone-300 mt-0.5">
                Add your own product pictures & prices, and manage WhatsApp orders directly
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-stone-800 text-stone-400 hover:text-white cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Success Alert Banner */}
        {saveSuccessMessage && (
          <div className="bg-emerald-700 text-white px-5 py-2.5 text-xs sm:text-sm font-bold flex items-center justify-between animate-in fade-in">
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-200 shrink-0" />
              {saveSuccessMessage}
            </span>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex border-b border-stone-200 bg-stone-50 px-4 sm:px-6 overflow-x-auto text-xs sm:text-sm font-semibold scrollbar-none">
          <button
            onClick={() => {
              setActiveTab('add');
              setEditingProduct(null);
            }}
            className={`py-3.5 px-4 border-b-2 cursor-pointer transition-colors whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'add' && !editingProduct
                ? 'border-emerald-800 text-emerald-950 bg-white shadow-xs'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <PackagePlus className="w-4 h-4 text-emerald-700" />
            <span>➕ Add New Product & Pics</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('prices');
              setEditingProduct(null);
            }}
            className={`py-3.5 px-4 border-b-2 cursor-pointer transition-colors whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'prices' || editingProduct
                ? 'border-emerald-800 text-emerald-950 bg-white shadow-xs'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <DollarSign className="w-4 h-4 text-emerald-700" />
            <span>Manage Products & Prices ({products.length})</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('whatsapp');
              setEditingProduct(null);
            }}
            className={`py-3.5 px-4 border-b-2 cursor-pointer transition-colors whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'whatsapp'
                ? 'border-emerald-800 text-emerald-950 bg-white shadow-xs'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <Phone className="w-4 h-4 text-emerald-700" />
            <span>WhatsApp Number ({settings.whatsappDisplayNumber})</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('logo');
              setEditingProduct(null);
            }}
            className={`py-3.5 px-4 border-b-2 cursor-pointer transition-colors whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'logo'
                ? 'border-emerald-800 text-emerald-950 bg-white shadow-xs'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <ImageIcon className="w-4 h-4 text-emerald-700" />
            <span>Custom Logo</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          {/* TAB 1: ADD NEW PRODUCT */}
          {activeTab === 'add' && !editingProduct && (
            <form onSubmit={handleAddNewProduct} className="space-y-5">
              <div className="bg-emerald-50/70 border border-emerald-200 p-3.5 rounded-2xl flex items-start gap-3">
                <div className="p-2 bg-emerald-700 text-white rounded-xl shrink-0 mt-0.5">
                  <Camera className="w-4 h-4" />
                </div>
                <div className="text-xs text-emerald-950 leading-relaxed">
                  <strong>Add Your Own Products:</strong> Upload photos directly from your phone gallery or computer, set your selling price in Rupees, and write details. All products are automatically published with <strong>Free Delivery</strong> &amp; <strong>Cash on Delivery across Pakistan</strong>!
                </div>
              </div>

              {/* Title & Selling Price */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase text-stone-700 mb-1">
                    Product Title / Name *
                  </label>
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. 3-Piece Embroidered Lawn Suit with Chiffon Dupatta"
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:bg-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-stone-700 mb-1">
                    Your Selling Price (PKR) *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-stone-500">
                      Rs.
                    </span>
                    <input
                      type="number"
                      value={newPrice}
                      onChange={(e) =>
                        setNewPrice(e.target.value === '' ? '' : Number(e.target.value))
                      }
                      placeholder="2950"
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl pl-10 pr-3 py-2.5 text-sm font-bold text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:bg-white"
                      required
                      min="1"
                    />
                  </div>
                </div>
              </div>

              {/* Category & Cut-off Price */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-stone-700 mb-1">
                    Category *
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700 cursor-pointer"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                    <option value="custom">+ Create New Category</option>
                  </select>

                  {newCategory === 'custom' && (
                    <input
                      type="text"
                      value={customCategory}
                      onChange={(e) => setCustomCategory(e.target.value)}
                      placeholder="Type custom category name (e.g. Footwear)"
                      className="w-full mt-2 bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-700"
                    />
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-stone-700 mb-1">
                    Original Price / Market MRP (Optional strike-through)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-stone-500">
                      Rs.
                    </span>
                    <input
                      type="number"
                      value={newOriginalPrice}
                      onChange={(e) =>
                        setNewOriginalPrice(e.target.value === '' ? '' : Number(e.target.value))
                      }
                      placeholder="3800 (Shows discount badge)"
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl pl-10 pr-3 py-2.5 text-sm text-stone-700 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:bg-white"
                      min="1"
                    />
                  </div>
                </div>
              </div>

              {/* PHOTO UPLOAD SECTION */}
              <div className="border-2 border-dashed border-stone-300 hover:border-emerald-700 rounded-2xl p-4 bg-stone-50/50 transition-colors">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-3">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-stone-800 flex items-center gap-1.5">
                      <Camera className="w-4 h-4 text-emerald-800" />
                      Product Photos ({newImages.length})
                    </h3>
                    <p className="text-[11px] text-stone-500">
                      Upload clear photos from your phone gallery or computer. First photo is the main cover.
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageFilesUpload}
                      accept="image/*"
                      multiple
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isUploading}
                      className="bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 cursor-pointer shadow-xs disabled:opacity-50"
                    >
                      <UploadCloud className="w-4 h-4" />
                      <span>{isUploading ? 'Compressing...' : 'Upload Photos from Device'}</span>
                    </button>
                  </div>
                </div>

                {/* Thumbnails list */}
                {newImages.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3 pt-2">
                    {newImages.map((imgUrl, idx) => (
                      <div
                        key={idx}
                        className="relative group rounded-xl overflow-hidden border border-stone-300 bg-white aspect-square shadow-xs"
                      >
                        <img
                          src={imgUrl}
                          alt={`Product photo ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                        {idx === 0 && (
                          <span className="absolute top-1 left-1 bg-emerald-800 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                            Cover
                          </span>
                        )}
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1 p-1">
                          {idx !== 0 && (
                            <button
                              type="button"
                              onClick={() => handleSetCoverImage(idx)}
                              className="text-[10px] bg-emerald-700 text-white px-2 py-0.5 rounded font-medium cursor-pointer"
                            >
                              Make Cover
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(idx)}
                            className="text-white hover:text-red-400 p-1 cursor-pointer"
                            title="Remove photo"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Optional Image URL Input */}
                <div className="mt-3 pt-3 border-t border-stone-200 flex items-center gap-2">
                  <span className="text-[11px] font-semibold text-stone-500 whitespace-nowrap">
                    Or paste Image URL:
                  </span>
                  <input
                    type="url"
                    value={imageUrlInput}
                    onChange={(e) => setImageUrlInput(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="flex-1 bg-white border border-stone-300 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-700"
                  />
                  <button
                    type="button"
                    onClick={handleAddImageUrl}
                    className="bg-stone-200 hover:bg-stone-300 text-stone-800 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer"
                  >
                    Add
                  </button>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold uppercase text-stone-700 mb-1">
                  Product Description & Details
                </label>
                <textarea
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Fabric type, embroidered details, package items, warranty, instructions..."
                  rows={3}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:bg-white"
                />
              </div>

              {/* Sizes and Colors */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-stone-700 mb-1">
                    Available Sizes (comma-separated, leave blank if not applicable)
                  </label>
                  <input
                    type="text"
                    value={newSizes}
                    onChange={(e) => setNewSizes(e.target.value)}
                    placeholder="Small, Medium, Large, XL"
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-stone-700 mb-1">
                    Available Colors (comma-separated, leave blank if not applicable)
                  </label>
                  <input
                    type="text"
                    value={newColors}
                    onChange={(e) => setNewColors(e.target.value)}
                    placeholder="Black, Maroon, Navy Blue, Emerald Green"
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:bg-white"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-3 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-xs text-stone-500">
                  ⚡ Product will be published live with WhatsApp order button &amp; Cash on Delivery.
                </div>
                <button
                  type="submit"
                  className="w-full sm:w-auto bg-emerald-800 hover:bg-emerald-900 text-white font-bold px-7 py-3 rounded-xl text-sm flex items-center justify-center gap-2 cursor-pointer shadow-md active:scale-98 transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>Publish Product to Batool Market</span>
                </button>
              </div>
            </form>
          )}

          {/* TAB 2: EDIT FULL PRODUCT SUBVIEW */}
          {editingProduct && (
            <form onSubmit={handleSaveEditedProduct} className="space-y-4">
              <div className="flex items-center justify-between bg-stone-100 p-3 rounded-xl">
                <span className="text-xs font-bold text-stone-800">
                  Editing: <span className="text-emerald-800">{editingProduct.name}</span>
                </span>
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="text-xs text-stone-500 hover:text-stone-900 font-semibold cursor-pointer"
                >
                  ← Back to All Products
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-stone-700 mb-1">
                    Product Title
                  </label>
                  <input
                    type="text"
                    value={editingProduct.name}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, name: e.target.value })
                    }
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-700"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-stone-700 mb-1">
                    Selling Price (PKR)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-stone-500">
                      Rs.
                    </span>
                    <input
                      type="number"
                      value={editingProduct.price}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          price: Number(e.target.value),
                        })
                      }
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl pl-10 pr-3 py-2 text-sm font-bold text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Photos of editing product */}
              <div className="border border-stone-300 rounded-xl p-3 bg-stone-50">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold uppercase text-stone-700">
                    Product Photos ({editingProduct.images.length})
                  </label>
                  <input
                    type="file"
                    ref={editFileInputRef}
                    onChange={handleEditProductImageUpload}
                    accept="image/*"
                    multiple
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => editFileInputRef.current?.click()}
                    disabled={isUploading}
                    className="text-xs bg-emerald-800 text-white px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <UploadCloud className="w-3.5 h-3.5" />
                    <span>Upload More Photos</span>
                  </button>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {editingProduct.images.map((imgUrl, i) => (
                    <div
                      key={i}
                      className="relative group rounded-lg overflow-hidden border border-stone-200 aspect-square"
                    >
                      <img src={imgUrl} alt="" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => {
                          const newImgs = editingProduct.images.filter((_, idx) => idx !== i);
                          setEditingProduct({
                            ...editingProduct,
                            images: newImgs.length ? newImgs : [imgUrl],
                          });
                        }}
                        className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                        title="Delete photo"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-stone-700 mb-1">
                  Description
                </label>
                <textarea
                  value={editingProduct.description}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, description: e.target.value })
                  }
                  rows={2}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => handleDeleteProduct(editingProduct.id, editingProduct.name)}
                  className="text-red-700 hover:text-red-800 text-xs font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete Product</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingProduct(null)}
                    className="px-4 py-2 border border-stone-300 rounded-xl text-xs font-semibold text-stone-700 hover:bg-stone-100 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-emerald-800 hover:bg-emerald-900 text-white font-bold px-6 py-2 rounded-xl text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Changes</span>
                  </button>
                </div>
              </div>
            </form>
          )}

          {/* TAB 3: MANAGE PRODUCTS & INLINE PRICES */}
          {activeTab === 'prices' && !editingProduct && (
            <div className="space-y-4">
              {/* Header Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-stone-100 p-3.5 rounded-2xl">
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-stone-900">
                    Product Catalog &amp; Selling Prices ({products.length} Products)
                  </h3>
                  <p className="text-[11px] text-stone-600">
                    Change prices directly in the box below, or click &quot;Edit &amp; Photos&quot; to change pictures.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveTab('add')}
                    className="bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-1.5 cursor-pointer shadow-xs whitespace-nowrap"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add New</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveAllPrices}
                    className="bg-stone-900 hover:bg-black text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 cursor-pointer shadow-xs whitespace-nowrap"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Save Prices</span>
                  </button>
                </div>
              </div>

              {/* Search filter for products */}
              <div className="relative">
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  placeholder="Filter products by title, category, or price..."
                  className="w-full pl-9 pr-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
              </div>

              {/* Products Table/List */}
              <div className="divide-y divide-stone-200 border border-stone-200 rounded-2xl max-h-[46vh] overflow-y-auto pr-1 bg-white">
                {filteredProductsToEdit.length === 0 ? (
                  <div className="p-8 text-center text-xs text-stone-500">
                    No products found matching &quot;{productSearch}&quot;.
                  </div>
                ) : (
                  filteredProductsToEdit.map((p) => (
                    <div
                      key={p.id}
                      className="p-3 sm:p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-stone-50/80 transition-colors"
                    >
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <img
                          src={p.images[0]}
                          alt={p.name}
                          className="w-14 h-14 rounded-xl object-cover shrink-0 border border-stone-200 bg-stone-100"
                        />
                        <div className="min-w-0 flex-1">
                          <h4 className="text-xs sm:text-sm font-bold text-stone-900 truncate">
                            {p.name}
                          </h4>
                          <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                            <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                              {p.category}
                            </span>
                            <span className="text-[11px] text-stone-500">
                              {p.images.length} photo{p.images.length > 1 ? 's' : ''}
                            </span>
                            <span className="text-[10px] text-emerald-700 font-medium">
                              COD &amp; Free Delivery
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Controls */}
                      <div className="flex items-center gap-2 justify-between sm:justify-end shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-stone-100">
                        {/* Inline price input */}
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-stone-600">Rs.</span>
                          <input
                            type="number"
                            value={p.price}
                            onChange={(e) => handlePriceChange(p.id, Number(e.target.value))}
                            className="w-24 text-right bg-stone-50 border border-stone-300 rounded-xl px-2.5 py-1.5 text-xs sm:text-sm font-bold text-stone-950 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                            min="50"
                            step="50"
                          />
                        </div>

                        {/* Edit Photos & Details */}
                        <button
                          type="button"
                          onClick={() => setEditingProduct(p)}
                          className="p-2 text-stone-600 hover:text-emerald-800 hover:bg-emerald-50 rounded-xl transition-colors cursor-pointer"
                          title="Edit Photos & Info"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>

                        {/* Delete Product */}
                        <button
                          type="button"
                          onClick={() => handleDeleteProduct(p.id, p.name)}
                          className="p-2 text-stone-400 hover:text-red-700 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
                          title="Delete Product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Bottom bar */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={onResetDefaults}
                  className="text-stone-500 hover:text-red-700 text-xs font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset to default catalog</span>
                </button>

                <button
                  type="button"
                  onClick={handleSaveAllPrices}
                  className="w-full sm:w-auto bg-emerald-800 hover:bg-emerald-900 text-white font-bold px-6 py-2.5 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <Save className="w-4 h-4" />
                  <span>Save All Prices</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 4: WHATSAPP NUMBER SETTINGS */}
          {activeTab === 'whatsapp' && (
            <form onSubmit={handleSaveGeneralSettings} className="space-y-4 max-w-lg">
              <div className="bg-emerald-50/70 border border-emerald-200 p-4 rounded-2xl text-xs text-emerald-950 leading-relaxed space-y-1">
                <p className="font-bold flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-700" /> WhatsApp Number Active
                </p>
                <p>
                  All customer <strong>&quot;Order on WhatsApp (Cash on Delivery)&quot;</strong> clicks route directly to your designated number with complete order details (Item name, size, color, quantity, total PKR, and delivery address).
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                  WhatsApp Direct Number (Format with 92 country code):
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={waNumber}
                    onChange={(e) => setWaNumber(e.target.value)}
                    placeholder="923015954967"
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl pl-10 pr-4 py-2.5 text-sm font-mono font-bold focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:bg-white"
                    required
                  />
                </div>
                <span className="text-[11px] text-stone-500 mt-1 block">
                  Current: <strong className="text-emerald-900">923015954967</strong> (Pakistan format: 92 + 3015954967)
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                  Display Number (Shown to Customers in Header &amp; Footer):
                </label>
                <input
                  type="text"
                  value={waDisplay}
                  onChange={(e) => setWaDisplay(e.target.value)}
                  placeholder="0301-5954967"
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-2.5 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:bg-white"
                  required
                />
              </div>

              {/* Live Test WhatsApp button */}
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between">
                <span className="text-xs text-stone-600 font-medium">Test WhatsApp link:</span>
                <a
                  href={generateGeneralWhatsAppUrl(waNumber, 'Test message from Batool Market Owner Setup!')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 hover:text-emerald-950 bg-emerald-100/80 px-3 py-1.5 rounded-lg transition-colors"
                >
                  <span>Open Chat</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="bg-emerald-800 hover:bg-emerald-900 text-white font-bold px-6 py-2.5 rounded-xl text-sm flex items-center gap-2 cursor-pointer shadow-sm"
                >
                  <Save className="w-4 h-4" />
                  <span>Update WhatsApp Number</span>
                </button>
              </div>
            </form>
          )}

          {/* TAB 5: CUSTOM LOGO */}
          {activeTab === 'logo' && (
            <form onSubmit={handleSaveGeneralSettings} className="space-y-4 max-w-lg">
              <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 text-xs text-stone-600 leading-relaxed">
                Upload your custom <strong>Batool Market logo</strong> or enter an image link. If left blank, our custom emerald &amp; gold regal emblem is displayed automatically.
              </div>

              {/* Upload logo from device */}
              <div className="flex items-center gap-3">
                <input
                  type="file"
                  ref={logoFileInputRef}
                  onChange={handleLogoUpload}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => logoFileInputRef.current?.click()}
                  className="bg-stone-100 hover:bg-stone-200 border border-stone-300 text-stone-800 font-bold text-xs px-4 py-2.5 rounded-xl flex items-center gap-1.5 cursor-pointer"
                >
                  <UploadCloud className="w-4 h-4 text-stone-600" />
                  <span>Upload Logo from Device</span>
                </button>
                <span className="text-xs text-stone-400">or paste URL below</span>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                  Logo Image URL:
                </label>
                <input
                  type="url"
                  value={logoUrl}
                  onChange={(e) => setLogoUrl(e.target.value)}
                  placeholder="https://example.com/batool-market-logo.png"
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
              </div>

              {logoUrl && (
                <div className="p-3 bg-stone-100 rounded-xl border border-stone-200 flex items-center gap-4">
                  <span className="text-xs font-semibold text-stone-500">Preview:</span>
                  <img
                    src={logoUrl}
                    alt="Logo preview"
                    className="h-12 max-w-[180px] object-contain rounded bg-white p-1 border border-stone-200"
                  />
                  <button
                    type="button"
                    onClick={() => setLogoUrl('')}
                    className="text-xs text-red-600 hover:text-red-800 font-semibold cursor-pointer ml-auto"
                  >
                    Remove
                  </button>
                </div>
              )}

              <div className="pt-2 flex items-center gap-3">
                <button
                  type="submit"
                  className="bg-emerald-800 hover:bg-emerald-900 text-white font-bold px-6 py-2.5 rounded-xl text-sm flex items-center gap-2 cursor-pointer shadow-sm"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Logo</span>
                </button>

                {logoUrl && (
                  <button
                    type="button"
                    onClick={() => {
                      setLogoUrl('');
                    }}
                    className="text-stone-600 hover:text-stone-900 text-xs font-semibold cursor-pointer"
                  >
                    Use Built-in Emerald &amp; Gold Emblem
                  </button>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
