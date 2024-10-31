// src/components/SketchfabEmbed.js

import React from 'react';

function SketchfabEmbed({ src, title, modelLink, authorLink, authorName }) {
    return (
        <div className="sketchfab-embed-wrapper" style={{ width: '100%', height: '500px', margin: '10px 0' }}>
            <iframe
                title={title}
                frameBorder="0"
                allow="autoplay; fullscreen; xr-spatial-tracking"
                mozallowfullscreen="true"
                webkitallowfullscreen="true"
                allowFullScreen
                src={src}
                style={{ width: '100%', height: '100%' }}
            ></iframe>
            <p style={{ fontSize: '13px', fontWeight: 'normal', margin: '5px', color: '#4A4A4A' }}>
                <a
                    href={modelLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontWeight: 'bold', color: '#1CAAD9' }}
                >
                    {title}
                </a>{' '}
                by{' '}
                <a
                    href={authorLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontWeight: 'bold', color: '#1CAAD9' }}
                >
                    {authorName}
                </a>{' '}
                on{' '}
                <a
                    href="https://sketchfab.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontWeight: 'bold', color: '#1CAAD9' }}
                >
                    Sketchfab
                </a>
            </p>
        </div>
    );
}

export default SketchfabEmbed;