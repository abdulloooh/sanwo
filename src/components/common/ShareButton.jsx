import React, { useState } from 'react';
import { FaShareAlt, FaFacebook, FaTwitter, FaLinkedin, FaWhatsapp, FaCopy, FaTimes } from 'react-icons/fa';
import './ShareButton.scss';

const ShareButton = ({ url, title, description, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const appUrl = url || window.location.origin;
  const shareTitle = title || 'Sanwo - Debt Management App';

  const handleShare = (platform) => {
    console.log('Sharing to:', platform);
    console.log('App URL:', appUrl);
    
    const encodedUrl = encodeURIComponent(appUrl);
    const encodedTitle = encodeURIComponent(shareTitle);
    const encodedText = encodeURIComponent(`${shareTitle} - ${appUrl}`);
    
    let shareUrl = '';
    
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
        break;
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodedText}`;
        break;
      default:
        return;
    }
    
    console.log('Share URL:', shareUrl);
    
    // Open in new window
    const newWindow = window.open(shareUrl, '_blank', 'width=600,height=400,scrollbars=yes,resizable=yes');
    
    if (!newWindow) {
      console.log('Popup blocked, trying alternative method');
      // If popup was blocked, try to open in same window
      window.location.href = shareUrl;
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(appUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        className={`share-button ${className}`}
        onClick={toggleModal}
        aria-label="Share Sanwo app"
        title="Share Sanwo app"
      >
        <FaShareAlt />
      </button>

      {isOpen && (
        <div className="share-modal-overlay" onClick={toggleModal}>
          <div className="share-modal" onClick={(e) => e.stopPropagation()}>
            <div className="share-modal-header">
              <h3>Share Sanwo</h3>
              <button className="close-button" onClick={toggleModal}>
                <FaTimes />
              </button>
            </div>
            
            <div className="share-modal-content">
              <p className="share-description">
                Help others manage their debts efficiently by sharing Sanwo!
              </p>
              
              <div className="share-buttons">
                <button
                  className="share-option facebook"
                  onClick={() => handleShare('facebook')}
                  title="Share on Facebook"
                >
                  <FaFacebook />
                  <span>Facebook</span>
                </button>
                
                <button
                  className="share-option twitter"
                  onClick={() => handleShare('twitter')}
                  title="Share on Twitter"
                >
                  <FaTwitter />
                  <span>Twitter</span>
                </button>
                
                <button
                  className="share-option linkedin"
                  onClick={() => handleShare('linkedin')}
                  title="Share on LinkedIn"
                >
                  <FaLinkedin />
                  <span>LinkedIn</span>
                </button>
                
                <button
                  className="share-option whatsapp"
                  onClick={() => handleShare('whatsapp')}
                  title="Share on WhatsApp"
                >
                  <FaWhatsapp />
                  <span>WhatsApp</span>
                </button>
              </div>
              
              <div className="copy-link-section">
                <div className="url-display">
                  <input
                    type="text"
                    value={appUrl}
                    readOnly
                    className="url-input"
                  />
                  <button
                    className={`copy-button ${copied ? 'copied' : ''}`}
                    onClick={handleCopyLink}
                    title={copied ? 'Copied!' : 'Copy link'}
                  >
                    <FaCopy />
                    <span>{copied ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ShareButton;
