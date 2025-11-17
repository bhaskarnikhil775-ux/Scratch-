
import React, { useState } from 'react';
import Header from '../components/Header';
import { useAppContext } from '../context/AppContext';
import { User, LogOut, Copy, Share2, HelpCircle, Shield, FileText, Send, Mail } from 'lucide-react';

const Profile: React.FC = () => {
  const { user, signOut } = useAppContext();
  const [copied, setCopied] = useState(false);

  if (!user) {
    return null;
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(user.referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  const handleShare = () => {
      if(navigator.share) {
          navigator.share({
              title: 'Join Scratch Earn!',
              text: 'Join me on Scratch Earn and earn real money! Use my link to get a bonus.',
              url: user.referralLink,
          })
      } else {
          alert('Share not supported on this browser. Please copy the link.');
      }
  }

  const ProfileInfo = () => (
      <div className="flex items-center space-x-4 p-4 bg-white rounded-2xl shadow-sm border border-gray-100">
          <img src={user.profilePic} alt={user.name} className="w-20 h-20 rounded-full border-4 border-white shadow-md" />
          <div>
              <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
              <p className="text-sm text-gray-500">{user.email}</p>
              <p className="text-xs text-gray-400 mt-1">ID: {user.id}</p>
          </div>
      </div>
  );

  const ReferralSection = () => (
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-800 mb-2">Your Referral Link</h3>
          <div className="flex items-center bg-gray-100 border border-dashed border-gray-300 p-2 rounded-lg">
              <input type="text" readOnly value={user.referralLink} className="flex-grow bg-transparent text-sm text-gray-600 outline-none" />
              <button onClick={handleCopy} className="ml-2 p-2 bg-gray-200 rounded-md hover:bg-gray-300">
                  <Copy className="w-5 h-5 text-gray-600" />
              </button>
          </div>
          {copied && <p className="text-green-600 text-xs mt-2 text-center">Link copied to clipboard!</p>}
          <div className="flex gap-4 mt-3">
               <button onClick={handleCopy} className="w-full flex items-center justify-center gap-2 bg-indigo-100 text-indigo-700 font-semibold py-2 px-4 rounded-lg hover:bg-indigo-200 transition-colors">
                  <Copy className="w-4 h-4" /> Copy Link
              </button>
              <button onClick={handleShare} className="w-full flex items-center justify-center gap-2 bg-green-100 text-green-700 font-semibold py-2 px-4 rounded-lg hover:bg-green-200 transition-colors">
                  <Share2 className="w-4 h-4" /> Share
              </button>
          </div>
      </div>
  );

  const LinkItem: React.FC<{icon: React.ElementType, text: string, href: string, isExternal?: boolean}> = ({icon: Icon, text, href, isExternal = true}) => (
      <a href={href} target={isExternal ? "_blank" : "_self"} rel={isExternal ? "noopener noreferrer" : ""} className="flex items-center p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:bg-gray-50 transition-colors">
          <Icon className="w-6 h-6 text-gray-500 mr-4" />
          <span className="font-medium text-gray-700">{text}</span>
      </a>
  )

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header title="Profile" />
      <div className="p-4 space-y-4">
        <ProfileInfo />
        <ReferralSection />

        <div className="space-y-3">
            <h3 className="font-bold text-gray-500 text-sm px-2 pt-2">Support</h3>
            <LinkItem icon={Send} text="Telegram" href="http://t.me/MASTEREARNNIK" />
            <LinkItem icon={Mail} text="Email Support" href="mailto:support@scratchearn.in" />
            
            <h3 className="font-bold text-gray-500 text-sm px-2 pt-2">Information</h3>
             <LinkItem icon={FileText} text="Terms & Conditions" href="#" isExternal={false} />
             <LinkItem icon={Shield} text="Privacy Policy" href="#" isExternal={false}/>
             <LinkItem icon={HelpCircle} text="FAQs" href="#" isExternal={false}/>
        </div>

        <button 
            onClick={signOut} 
            className="w-full flex items-center justify-center gap-2 mt-4 bg-red-100 text-red-700 font-bold py-3 px-4 rounded-lg hover:bg-red-200 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Profile;
