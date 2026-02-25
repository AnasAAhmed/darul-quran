import { useEffect } from 'react';
import { pageTitle } from '../lib/utils';

const useDynamicMeta = ({ location }) => {

    useEffect(() => {
        const path = location.pathname;

        const title = path === '/'
            ? 'Darul Quran | Online Islamic & Quran Learning Platform'
            : `${path} | Darul Quran | Online Islamic & Quran Learning Platform`;
        document.title = pageTitle(title);

        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
            let content = '';

            if (path === '/') {
                content = 'Darul Quran is an online Islamic learning platform offering Quran, Tajweed, Hifz, and Islamic studies courses with lifetime access, interactive dashboards, live chat support, and dedicated portals for students, teachers, and administrators.';
            } else {
                content = `${pageTitle(path)} page at Darul Quran is an online Islamic learning platform offering Quran, Tajweed, Hifz, and Islamic studies courses with lifetime access, interactive dashboards, live chat support, and dedicated portals for students, teachers, and administrators.`;
            }

            metaDesc.setAttribute('content', content);
        }
        // }
    }, [location]);
};

export default useDynamicMeta;