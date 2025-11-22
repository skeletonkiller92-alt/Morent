import React from 'react';
import { Star, ShieldCheck, Mail, Phone, Calendar } from 'lucide-react';

export const ProfilePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8">
          
          {/* Sidebar / User Info */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center">
              <div className="relative inline-block">
                <img 
                  src="https://picsum.photos/100/100?random=999" 
                  alt="Murad Huseynov" 
                  className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-4 border-gray-50"
                />
                <div className="absolute bottom-2 right-0 bg-brand-600 text-white p-1 rounded-full border-2 border-white">
                  <ShieldCheck size={14} />
                </div>
              </div>
              <h1 className="text-xl font-bold text-gray-900">Murad Huseynov</h1>
              <p className="text-sm text-gray-500 mb-4">Joined December 2023</p>
              
              <div className="flex justify-center gap-4 text-sm text-gray-600 mb-6">
                 <div className="text-center">
                    <span className="block font-bold text-gray-900">0</span>
                    <span>Trips</span>
                 </div>
                 <div className="text-center">
                    <span className="block font-bold text-gray-900">0</span>
                    <span>Reviews</span>
                 </div>
              </div>

              <button className="w-full border border-gray-300 text-gray-700 font-semibold py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                Edit Profile
              </button>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
               <h3 className="font-bold text-gray-900 mb-4">Verified Info</h3>
               <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3 text-gray-700">
                     <ShieldCheck size={18} className="text-green-500" />
                     <span>Identity Verified</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                     <Mail size={18} className="text-green-500" />
                     <span>Email Address</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                     <Phone size={18} className="text-green-500" />
                     <span>Phone Number</span>
                  </div>
               </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="space-y-6">
             {/* Reviews Section */}
             <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 h-64 flex flex-col items-center justify-center text-center">
                <Star size={48} className="text-gray-200 mb-4" />
                <h3 className="font-bold text-gray-900 text-lg">No reviews yet</h3>
                <p className="text-gray-500 max-w-xs">Reviews from hosts will appear here after you complete your trips.</p>
             </div>
             
             {/* Recent Activity (Placeholder) */}
             <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-900 text-lg mb-6">Recent Activity</h3>
                <div className="flex items-start gap-4 pb-6 border-b border-gray-100">
                   <div className="bg-brand-100 p-3 rounded-full text-brand-600">
                      <Calendar size={20} />
                   </div>
                   <div>
                      <p className="font-medium text-gray-900">Account created</p>
                      <p className="text-sm text-gray-500">You joined Morent on December 15, 2023</p>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};