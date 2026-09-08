import { useState } from 'react';

export const I18N = {
  en: {
    tagline: 'Smart Logistics · NER', nav_overview: 'Overview', nav_map: 'Live GIS Map', nav_route: 'Route Optimizer',
    nav_alerts: 'Smart Alerts', nav_reports: 'Field Reports', nav_analytics: 'Analytics',
    online: 'Connected', simulate_offline: 'Simulate offline',
    page_sub_overview: 'Predict the disruption. Optimize the route. Keep essentials moving.',
    stat_alerts: 'Active Alerts', stat_vehicles: 'Vehicles Tracked', stat_routes: 'Routes Optimized', stat_reports: 'Field Reports',
    recent_alerts: 'Recent Alerts', recent_activity: 'Recent Activity',
    layer_hazards: 'Hazards', layer_vehicles: 'Vehicles',
    route_title: 'AI Route Optimization', route_sub: 'Predict disruptions and get the safest alternate route between two points.',
    origin: 'Origin', destination: 'Destination', find_route: 'Find Safest Route', route_map_title: 'Route Preview',
    risk_score: 'Risk Score', distance: 'Distance', eta: 'Estimated ETA', hazards_avoided: 'Hazards Avoided', recommendation: 'Recommendation',
    filter_all: 'All', filter_high: 'High', filter_medium: 'Medium', filter_low: 'Low',
    submit_report: 'Submit Field Report', report_sub: "Click a location on the map, add details, and submit — reports queue automatically if you're offline.",
    type_landslide: 'Landslide', type_flood: 'Flood', type_blockage: 'Road Blockage', type_bridge: 'Bridge Damage',
    submit: 'Submit Report', report_list_title: 'Submitted Reports', report_desc_ph: 'Describe what you see...',
    chat_title: 'AAPDA Assistant', analytics_title: 'Analytics', logout: 'Log out',
  },
  hi: {
    tagline: 'स्मार्ट लॉजिस्टिक्स · NER', nav_overview: 'अवलोकन', nav_map: 'लाइव जीआईएस मानचित्र', nav_route: 'मार्ग अनुकूलक',
    nav_alerts: 'स्मार्ट अलर्ट', nav_reports: 'फील्ड रिपोर्ट', nav_analytics: 'विश्लेषण',
    online: 'कनेक्टेड', simulate_offline: 'ऑफ़लाइन सिमुलेट करें',
    page_sub_overview: 'व्यवधान का अनुमान लगाएं। मार्ग अनुकूलित करें। आवश्यक सामान चलता रखें।',
    stat_alerts: 'सक्रिय अलर्ट', stat_vehicles: 'ट्रैक किए गए वाहन', stat_routes: 'अनुकूलित मार्ग', stat_reports: 'फील्ड रिपोर्ट',
    recent_alerts: 'हाल के अलर्ट', recent_activity: 'हाल की गतिविधि',
    layer_hazards: 'खतरे', layer_vehicles: 'वाहन',
    route_title: 'एआई मार्ग अनुकूलन', route_sub: 'व्यवधानों का अनुमान लगाएं और सबसे सुरक्षित वैकल्पिक मार्ग पाएं।',
    origin: 'प्रारंभिक स्थान', destination: 'गंतव्य', find_route: 'सुरक्षित मार्ग खोजें', route_map_title: 'मार्ग पूर्वावलोकन',
    risk_score: 'जोखिम स्कोर', distance: 'दूरी', eta: 'अनुमानित समय', hazards_avoided: 'बचे हुए खतरे', recommendation: 'सिफारिश',
    filter_all: 'सभी', filter_high: 'उच्च', filter_medium: 'मध्यम', filter_low: 'कम',
    submit_report: 'फील्ड रिपोर्ट सबमिट करें', report_sub: 'मानचित्र पर स्थान चुनें, विवरण जोड़ें और सबमिट करें।',
    type_landslide: 'भूस्खलन', type_flood: 'बाढ़', type_blockage: 'सड़क अवरोध', type_bridge: 'पुल क्षति',
    submit: 'रिपोर्ट सबमिट करें', report_list_title: 'सबमिट की गई रिपोर्ट', report_desc_ph: 'विवरण दर्ज करें...',
    chat_title: 'AAPDA सहायक', analytics_title: 'विश्लेषण', logout: 'लॉग आउट',
  },
};

export function useI18n() {
  const [lang, setLang] = useState('en');
  const t = (key) => (I18N[lang] && I18N[lang][key]) || key;
  return { lang, setLang, t };
}
