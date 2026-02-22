import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export default function AdBanner({ placement }) {
    const [ad, setAd] = useState(null);

    useEffect(() => {
        supabase.from('ads')
            .select('image_url, link_url')
            .eq('is_active', true)
            .eq('placement', placement)
            .then(({ data }) => {
                if (data && data.length > 0) {
                    // Pick one random ad if there are multiple active ads for this placement
                    const randomAd = data[Math.floor(Math.random() * data.length)];
                    setAd(randomAd);
                }
            });
    }, [placement]);

    // If no ad is returned from the database, hide the component entirely.
    if (!ad) return null;

    return (
        <a
            href={ad.link_url}
            target="_blank"
            rel="noopener noreferrer sponsored"
            style={{
                display: 'block',
                textDecoration: 'none',
                margin: placement === 'content_bottom' ? '32px 0' : '0'
            }}
        >
            <img
                src={ad.image_url}
                alt="Advertisement"
                style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: 12,
                    display: 'block',
                    border: '1px solid var(--border)',
                    transition: 'border-color 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(245,197,24,0.4)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
            />
        </a>
    );
}
