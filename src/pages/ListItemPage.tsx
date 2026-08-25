import { useState } from 'react';
import {
  Upload, ArrowRight, ArrowLeft, Check, Sparkles, Camera,
  Tag, IndianRupee, Shield, Calendar, Truck, Rocket, X,
  Image as ImageIcon, Wand2,
} from 'lucide-react';
import { useRouter } from '@/router';
import { categories } from '@/data/products';

const steps = [
  { num: 1, title: 'Photos', icon: Camera },
  { num: 2, title: 'Information', icon: Tag },
  { num: 3, title: 'Borrowing Price', icon: IndianRupee },
  { num: 4, title: 'Security Deposit', icon: Shield },
  { num: 5, title: 'Availability', icon: Calendar },
  { num: 6, title: 'Delivery', icon: Truck },
  { num: 7, title: 'Publish', icon: Rocket },
];

export function ListItemPage() {
  const { navigate } = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([]);
  const [aiSuggested, setAiSuggested] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    condition: '',
    description: '',
    pricePerDay: '',
    pricePerWeek: '',
    securityDeposit: '',
    deliveryOptions: [] as string[],
  });

  const next = () => setCurrentStep((s) => Math.min(s + 1, 7));
  const prev = () => setCurrentStep((s) => Math.max(s - 1, 1));

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const remaining = 6 - uploadedPhotos.length;
    const toAdd = Array.from(files).slice(0, remaining);
    const readers = toAdd.map((file) => {
      return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    });
    Promise.all(readers).then((dataUrls) => {
      setUploadedPhotos((prev) => [...prev, ...dataUrls]);
    });
    e.target.value = '';
  };

  const toggleDelivery = (opt: string) => {
    setFormData((d) => ({
      ...d,
      deliveryOptions: d.deliveryOptions.includes(opt)
        ? d.deliveryOptions.filter((o) => o !== opt)
        : [...d.deliveryOptions, opt],
    }));
  };

  const handleAiSuggest = () => {
    setAiSuggested(true);
    setFormData((d) => ({
      ...d,
      name: 'Sony Camera A7 IV',
      category: 'Cameras',
      condition: 'Like New',
      description: 'The Sony A7 IV is a hybrid full-frame camera with a 33MP sensor and 4K 60p recording. Comes with the 28-70mm kit lens and two batteries.',
      pricePerDay: '1200',
      pricePerWeek: '7200',
      securityDeposit: '15000',
    }));
  };

  return (
    <div className="container-max px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-navy-900">List an Item</h1>
        <p className="text-navy-500 mt-1">Share your product with the community and start earning.</p>
      </div>

      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          {steps.map((step, i) => (
            <div key={step.num} className="flex items-center flex-1 last:flex-initial">
              <div className="flex flex-col items-center gap-2">
                <div
                  className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all ${
                    currentStep === step.num
                      ? 'bg-emerald-500 text-white shadow-soft'
                      : currentStep > step.num
                      ? 'bg-navy-900 text-white'
                      : 'bg-navy-50 text-navy-300'
                  }`}
                >
                  {currentStep > step.num ? <Check className="w-5 h-5" /> : <step.icon className="w-5 h-5" />}
                </div>
                <span className={`text-xs font-semibold hidden sm:block ${currentStep === step.num ? 'text-navy-900' : 'text-navy-400'}`}>
                  {step.title}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className={`h-1 flex-1 mx-1 rounded-full transition-all ${currentStep > step.num ? 'bg-emerald-500' : 'bg-navy-100'}`} />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="card p-6 lg:p-8">
            {/* Step 1: Photos */}
            {currentStep === 1 && (
              <div className="animate-fade-in">
                <h2 className="text-xl font-bold text-navy-900 mb-2">Upload photos</h2>
                <p className="text-sm text-navy-500 mb-6">Add clear, well-lit photos of your product. Up to 6 photos.</p>

                {/* AI suggestion banner */}
                <div className="rounded-2xl bg-gradient-to-br from-emerald-50 to-accent-50 p-4 mb-6 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white shadow-soft flex items-center justify-center shrink-0">
                    <Wand2 className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-navy-900">AI-Assisted Suggestions</p>
                    <p className="text-xs text-navy-500">Upload a photo and we'll suggest the product name, category, description, and approximate borrowing price.</p>
                  </div>
                  <button onClick={handleAiSuggest} className="btn-emerald !px-4 !py-2 text-xs shrink-0">
                    <Sparkles className="w-3.5 h-3.5" />
                    Try AI
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {uploadedPhotos.map((photo, i) => (
                    <div key={i} className="relative aspect-square rounded-2xl overflow-hidden group">
                      <img src={photo} alt="" className="w-full h-full object-cover" />
                      <button
                        onClick={() => setUploadedPhotos((prev) => prev.filter((_, idx) => idx !== i))}
                        className="absolute top-2 right-2 w-7 h-7 rounded-lg bg-white/90 flex items-center justify-center text-error-500 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  {uploadedPhotos.length < 6 && (
                    <label
                      className="aspect-square rounded-2xl border-2 border-dashed border-navy-200 flex flex-col items-center justify-center text-navy-400 hover:border-emerald-500 hover:text-emerald-500 transition-colors cursor-pointer"
                    >
                      <Upload className="w-6 h-6 mb-2" />
                      <span className="text-xs font-semibold">Add photo</span>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handlePhotoUpload}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>
            )}

            {/* Step 2: Information */}
            {currentStep === 2 && (
              <div className="animate-fade-in space-y-5">
                <h2 className="text-xl font-bold text-navy-900 mb-2">Product information</h2>
                <p className="text-sm text-navy-500 mb-6">Tell borrowers about your product.</p>

                {aiSuggested && (
                  <div className="rounded-2xl bg-emerald-50 p-3 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-600" />
                    <span className="text-sm text-emerald-700 font-semibold">AI suggestions applied — review and edit as needed.</span>
                  </div>
                )}

                <div>
                  <label className="text-sm font-semibold text-navy-700 mb-1.5 block">Product name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Sony Camera A7 IV"
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-navy-700 mb-1.5 block">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="input-field"
                  >
                    <option value="">Select a category</option>
                    {categories.map((cat) => (
                      <option key={cat.name} value={cat.name}>{cat.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-sm font-semibold text-navy-700 mb-1.5 block">Condition</label>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                    {['New', 'Like New', 'Excellent', 'Good', 'Fair'].map((c) => (
                      <button
                        key={c}
                        onClick={() => setFormData({ ...formData, condition: c })}
                        className={`rounded-xl py-2.5 text-sm font-semibold transition-all ${
                          formData.condition === c ? 'bg-emerald-500 text-white' : 'bg-navy-50 text-navy-600 hover:bg-navy-100'
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold text-navy-700 mb-1.5 block">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Describe your product, what's included, and any important details..."
                    rows={4}
                    className="input-field resize-none"
                  />
                </div>
              </div>
            )}

            {/* Step 3: Borrowing Price */}
            {currentStep === 3 && (
              <div className="animate-fade-in space-y-5">
                <h2 className="text-xl font-bold text-navy-900 mb-2">Set borrowing price</h2>
                <p className="text-sm text-navy-500 mb-6">How much will you charge per day and per week?</p>

                <div>
                  <label className="text-sm font-semibold text-navy-700 mb-1.5 block">Daily price</label>
                  <div className="relative">
                    <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-navy-300" />
                    <input
                      type="number"
                      value={formData.pricePerDay}
                      onChange={(e) => setFormData({ ...formData, pricePerDay: e.target.value })}
                      placeholder="1200"
                      className="input-field pl-12"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold text-navy-700 mb-1.5 block">Weekly price (optional)</label>
                  <div className="relative">
                    <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-navy-300" />
                    <input
                      type="number"
                      value={formData.pricePerWeek}
                      onChange={(e) => setFormData({ ...formData, pricePerWeek: e.target.value })}
                      placeholder="7200"
                      className="input-field pl-12"
                    />
                  </div>
                </div>

                <div className="rounded-2xl bg-emerald-50 p-4 flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold text-navy-900">AI Price Suggestion</p>
                    <p className="text-xs text-navy-500 mt-1">Based on similar listings in your category and location, we suggest ₹1,000-1,500/day for this product.</p>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Security Deposit */}
            {currentStep === 4 && (
              <div className="animate-fade-in space-y-5">
                <h2 className="text-xl font-bold text-navy-900 mb-2">Security deposit</h2>
                <p className="text-sm text-navy-500 mb-6">Set a refundable deposit to protect your product.</p>

                <div>
                  <label className="text-sm font-semibold text-navy-700 mb-1.5 block">Security deposit amount</label>
                  <div className="relative">
                    <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-navy-300" />
                    <input
                      type="number"
                      value={formData.securityDeposit}
                      onChange={(e) => setFormData({ ...formData, securityDeposit: e.target.value })}
                      placeholder="15000"
                      className="input-field pl-12"
                    />
                  </div>
                </div>

                <div className="rounded-2xl bg-navy-50 p-4">
                  <p className="text-sm font-semibold text-navy-700 mb-2">How deposits work</p>
                  <ul className="space-y-2 text-xs text-navy-500">
                    <li className="flex items-start gap-2"><Check className="w-4 h-4 text-emerald-500 shrink-0" /> Deposit is held securely at booking</li>
                    <li className="flex items-start gap-2"><Check className="w-4 h-4 text-emerald-500 shrink-0" /> Fully refunded when product returns in good condition</li>
                    <li className="flex items-start gap-2"><Check className="w-4 h-4 text-emerald-500 shrink-0" /> Covers accidental damage up to the deposit amount</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Step 5: Availability */}
            {currentStep === 5 && (
              <div className="animate-fade-in space-y-5">
                <h2 className="text-xl font-bold text-navy-900 mb-2">Set availability</h2>
                <p className="text-sm text-navy-500 mb-6">When can borrowers pick up your product?</p>

                <div className="grid grid-cols-7 gap-1">
                  {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                    <div key={i} className="text-center text-xs font-semibold text-navy-400 py-1">{day}</div>
                  ))}
                  {Array.from({ length: 35 }, (_, i) => {
                    const dayNum = i - 2;
                    const isAvailable = dayNum > 0 && dayNum <= 31;
                    return (
                      <div key={i} className={`aspect-square rounded-lg flex items-center justify-center text-xs font-medium ${
                        dayNum < 1 || dayNum > 31 ? '' : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 cursor-pointer'
                      }`}>
                        {dayNum > 0 && dayNum <= 31 ? dayNum : ''}
                      </div>
                    );
                  })}
                </div>

                <div className="flex gap-3">
                  <label className="flex items-center gap-2 text-sm text-navy-600">
                    <input type="checkbox" defaultChecked className="rounded accent-emerald-500" />
                    Available on weekends
                  </label>
                  <label className="flex items-center gap-2 text-sm text-navy-600">
                    <input type="checkbox" defaultChecked className="rounded accent-emerald-500" />
                    Same-day pickup
                  </label>
                </div>
              </div>
            )}

            {/* Step 6: Delivery */}
            {currentStep === 6 && (
              <div className="animate-fade-in space-y-5">
                <h2 className="text-xl font-bold text-navy-900 mb-2">Pickup & delivery options</h2>
                <p className="text-sm text-navy-500 mb-6">How can borrowers receive your product?</p>

                <div className="space-y-3">
                  {['Pickup', 'Doorstep delivery', 'Courier'].map((opt) => (
                    <button
                      key={opt}
                      onClick={() => toggleDelivery(opt)}
                      className={`flex items-center justify-between w-full p-4 rounded-2xl ring-1 transition-all ${
                        formData.deliveryOptions.includes(opt) ? 'ring-emerald-500 bg-emerald-50' : 'ring-navy-900/10 hover:ring-navy-900/20'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-md flex items-center justify-center ${formData.deliveryOptions.includes(opt) ? 'bg-emerald-500' : 'ring-1 ring-navy-200'}`}>
                          {formData.deliveryOptions.includes(opt) && <Check className="w-3.5 h-3.5 text-white" />}
                        </div>
                        <span className="font-semibold text-navy-900">{opt}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 7: Publish */}
            {currentStep === 7 && (
              <div className="animate-fade-in text-center py-8">
                <div className="w-20 h-20 rounded-3xl bg-emerald-100 flex items-center justify-center mx-auto mb-6">
                  <Rocket className="w-10 h-10 text-emerald-600" />
                </div>
                <h2 className="text-2xl font-extrabold text-navy-900 mb-3">Ready to publish!</h2>
                <p className="text-navy-500 mb-8 max-w-md mx-auto">Your listing is all set. Review the details below and publish to make it available to borrowers.</p>

                <div className="rounded-3xl bg-[#F8FAFC] p-6 text-left max-w-md mx-auto mb-8">
                  {uploadedPhotos.length > 0 && (
                    <img src={uploadedPhotos[0]} alt="" className="w-full aspect-video rounded-2xl object-cover mb-4" />
                  )}
                  <dl className="space-y-2 text-sm">
                    <div className="flex justify-between"><dt className="text-navy-400">Name</dt><dd className="font-semibold text-navy-900">{formData.name || '—'}</dd></div>
                    <div className="flex justify-between"><dt className="text-navy-400">Category</dt><dd className="font-semibold text-navy-900">{formData.category || '—'}</dd></div>
                    <div className="flex justify-between"><dt className="text-navy-400">Condition</dt><dd className="font-semibold text-navy-900">{formData.condition || '—'}</dd></div>
                    <div className="flex justify-between"><dt className="text-navy-400">Daily price</dt><dd className="font-semibold text-navy-900">₹{formData.pricePerDay || '—'}</dd></div>
                    <div className="flex justify-between"><dt className="text-navy-400">Deposit</dt><dd className="font-semibold text-navy-900">₹{formData.securityDeposit || '—'}</dd></div>
                    <div className="flex justify-between"><dt className="text-navy-400">Delivery</dt><dd className="font-semibold text-navy-900">{formData.deliveryOptions.join(', ') || '—'}</dd></div>
                  </dl>
                </div>

                <button onClick={() => navigate({ name: 'browse' })} className="btn-primary">
                  Publish Listing
                  <Rocket className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Navigation buttons */}
            {currentStep < 7 && (
              <div className="flex justify-between mt-8 pt-6 border-t border-navy-100">
                <button
                  onClick={prev}
                  disabled={currentStep === 1}
                  className="btn-ghost disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>
                <button onClick={next} className="btn-primary">
                  Continue
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
            {currentStep === 7 && (
              <div className="flex justify-between mt-8 pt-6 border-t border-navy-100">
                <button onClick={prev} className="btn-ghost">
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Tips sidebar */}
        <aside className="hidden lg:block">
          <div className="card p-6 lg:sticky lg:top-20">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-emerald-500" />
              <h3 className="font-bold text-navy-900">Listing Tips</h3>
            </div>
            <ul className="space-y-3 text-sm text-navy-500">
              <li className="flex items-start gap-2"><Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> Use natural lighting for photos</li>
              <li className="flex items-start gap-2"><Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> Show the product from multiple angles</li>
              <li className="flex items-start gap-2"><Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> Be honest about condition and wear</li>
              <li className="flex items-start gap-2"><Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> List what's included (accessories, case, etc.)</li>
              <li className="flex items-start gap-2"><Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> Set a fair, competitive price</li>
              <li className="flex items-start gap-2"><Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> Respond to borrower requests quickly</li>
            </ul>

            <div className="mt-6 rounded-2xl bg-emerald-50 p-4">
              <p className="text-xs font-bold text-emerald-700 mb-1">Did you know?</p>
              <p className="text-xs text-navy-500">Listings with 4+ photos get 3x more borrow requests on average.</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
