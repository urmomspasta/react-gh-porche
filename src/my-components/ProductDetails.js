// src/components/ProductDetails.js

import React, { useState, useEffect, useRef } from 'react';

function ProductDetails({ product, onClose, onAddComment, comments }) {
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);
    const [likes, setLikes] = useState(product.likes || 0);
    const [dislikes, setDislikes] = useState(product.dislikes || 0);
    const [newComment, setNewComment] = useState('');
    const commentsEndRef = useRef(null);

    useEffect(() => {
        if (commentsEndRef.current) {
            commentsEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [comments]); // Scroll to the bottom when comments change

    const handleLike = () => {
        if (!liked) {
            setLikes(likes + 1);
            if (disliked) {
                setDisliked(false);
                setDislikes(dislikes - 1);
            }
        } else {
            setLikes(likes - 1);
        }
        setLiked(!liked);
    };

    const handleDislike = () => {
        if (!disliked) {
            setDislikes(dislikes + 1);
            if (liked) {
                setLiked(false);
                setLikes(likes - 1);
            }
        } else {
            setDislikes(dislikes - 1);
        }
        setDisliked(!disliked);
    };

    const handleAddComment = () => {
        if (newComment.trim()) {
            onAddComment(product.id, newComment); // Update comment in parent component
            setNewComment(''); // Clear the input field
        }
    };
    
    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 >= 0.5;

        for (let i = 0; i < fullStars; i++) {
            stars.push(<i key={i} className="bi bi-star-fill" style={{ color: 'gold' }}></i>);
        }
        if (halfStar) {
            stars.push(<i key="half" className="bi bi-star-half" style={{ color: 'gold' }}></i>);
        }
        while (stars.length < 5) {
            stars.push(<i key={`empty-${stars.length}`} className="bi bi-star" style={{ color: 'gray' }}></i>);
        }
        return stars;
    };

    return (
        <div style={modalOverlayStyle}>
            <div style={modalContentStyle}>
                <button onClick={onClose} style={closeButtonStyle}>×</button>

                <div style={modalBodyStyle}>
                    {/* Image Section */}
                    <div style={imageSectionStyle}>
                        <img
                            src={product.image}
                            alt={product.name}
                            style={{ width: '100%', height: '40vh', borderRadius: '8px', maxHeight: '250px', objectFit: 'contain' }}
                        />
                    </div>

                    {/* Info Section */}
                    <div style={infoSectionStyle}>
                        <h2>{product.name}</h2>
                        <p>{product.description}</p>
                        <p style={{ fontSize: '1.3rem' }}><strong>Price: </strong>${product.price.toFixed(2)}</p>
                        <div>{renderStars(product.rating)}</div>

                        {/* Like / Dislike Buttons */}
                        <div style={likeDislikeContainerStyle}>
                            <button onClick={handleLike} style={likeButtonStyle}>
                                <i
                                    className={`bi bi-hand-thumbs-up${liked ? '-fill' : ''}`}
                                    style={{ color: liked ? '#1CAAD9' : '#ccc' }}
                                ></i>
                                {` ${likes}`}
                            </button>
                            <button onClick={handleDislike} style={dislikeButtonStyle}>
                                <i
                                    className={`bi bi-hand-thumbs-down${disliked ? '-fill' : ''}`}
                                    style={{ color: disliked ? '#FF6B6B' : '#ccc' }}
                                ></i>
                                {` ${dislikes}`}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Review Section */}
                <div style={reviewSectionStyle}>
                    <h3>Reviews</h3>
                    {product.comments && product.comments.length > 0 ? (
                        <ul style={commentListStyle}>
                            {comments.map((comment, index) => (
                                <li key={index} style={commentStyle}>{comment}</li>
                            ))}
                            <div ref={commentsEndRef} />
                        </ul>
                    ) : (
                        <p>No comments yet. Be the first to add one!</p>
                    )}
                    <div style={commentInputContainerStyle}>
                        <textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Add a comment..."
                            style={commentInputStyle}
                        />
                        <button onClick={handleAddComment} style={addCommentButtonStyle}>
                            Post
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

// CSS-in-JS styles
const modalOverlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
};

const modalContentStyle = {
    position: 'relative',
    backgroundColor: 'white',
    borderRadius: '10px',
    width: '80%',
    maxWidth: '800px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    paddingBottom: '20px',
    overflowY: 'auto', // Allows scrolling when content overflows
    maxHeight: '90vh', // Restricting modal height to view height
};

const modalHeaderStyle = {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: '10px',
};

const closeButtonStyle = {
    position: 'absolute',
    top: '5px',
    right: '-45%',
    background: 'none',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
    justifyContent: 'end'
};

const modalBodyStyle = {
    display: 'flex',
    gap: '20px',
    padding: '40px 20px 20px',
};

const imageSectionStyle = {
    flex: '1',
};

const infoSectionStyle = {
    flex: '2',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
};

const likeDislikeContainerStyle = {
    display: 'flex',
    gap: '10px',
    marginTop: '10px',
};

const likeButtonStyle = {
    background: 'none',
    border: 'none',
    fontSize: '18px',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    gap: '5px',
};

const dislikeButtonStyle = {
    ...likeButtonStyle,
};

const reviewSectionStyle = {
    padding: '20px',
    borderTop: '1px solid #e0e0e0',
    textAlign: 'center',
};

const commentListStyle = {
    listStyleType: 'none',
    padding: 0,
    margin: '10px 0',
    maxHeight: '30vh', // Restrict height for scrolling
    overflowY: 'auto', // Enables scrolling within the comments section
};

const commentStyle = {
    padding: '15px',
    borderBottom: '1px solid #e0e0e0',
};

const commentInputContainerStyle = {
    display: 'flex',
    gap: '10px',
    marginTop: '10px',
    alignItems: 'center',
};

const commentInputStyle = {
    flex: 1,
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    minHeight: '5px', // Increased textarea height
    minWidth: '75%',
    resize: 'none',
};

const addCommentButtonStyle = {
    padding: '20px', // Smaller Post button
    borderRadius: '5px',
    minHeight: '5px', // Increased textarea height
    marginBottom: '15px',
    border: 'none',
    backgroundColor: '#1CAAD9',
    color: 'white',
    cursor: 'pointer',
    fontSize: '20px',
};

export default ProductDetails;
