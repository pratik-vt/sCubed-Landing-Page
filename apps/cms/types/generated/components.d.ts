import type { Schema, Struct } from '@strapi/strapi';

export interface BlogModuleAudio extends Struct.ComponentSchema {
  collectionName: 'components_blog_module_audios';
  info: {
    description: 'Audio player with podcast-style metadata and transcript support';
    displayName: 'ModuleAudio';
  };
  attributes: {
    audio_description: Schema.Attribute.Text;
    audio_file: Schema.Attribute.Media<'audios'> & Schema.Attribute.Required;
    audio_title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 200;
      }>;
    autoplay: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    cover_artwork: Schema.Attribute.Media<'images'>;
    duration: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 10;
      }>;
    loop: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    player_style: Schema.Attribute.Enumeration<
      ['minimal', 'standard', 'featured']
    > &
      Schema.Attribute.DefaultTo<'standard'>;
    podcast_episode: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 50;
      }>;
    show_download: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    transcript: Schema.Attribute.RichText;
  };
}

export interface BlogModuleImage extends Struct.ComponentSchema {
  collectionName: 'components_blog_module_images';
  info: {
    description: 'Image content block with styling and link options';
    displayName: 'ModuleImage';
  };
  attributes: {
    alt_text: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 100;
      }>;
    border_style: Schema.Attribute.Enumeration<
      ['none', 'rounded', 'circle', 'shadow']
    > &
      Schema.Attribute.DefaultTo<'rounded'>;
    caption: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 200;
      }>;
    clickable: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    image_alignment: Schema.Attribute.Enumeration<['left', 'center', 'right']> &
      Schema.Attribute.DefaultTo<'center'>;
    image_size: Schema.Attribute.Enumeration<
      ['thumbnail', 'medium', 'large', 'full-width']
    > &
      Schema.Attribute.DefaultTo<'large'>;
    link_url: Schema.Attribute.String;
  };
}

export interface BlogModuleQuote extends Struct.ComponentSchema {
  collectionName: 'components_blog_module_quotes';
  info: {
    description: 'Quote content block with author attribution';
    displayName: 'ModuleQuote';
  };
  attributes: {
    author_company: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 100;
      }>;
    author_name: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 100;
      }>;
    author_photo: Schema.Attribute.Media<'images'>;
    author_position: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 100;
      }>;
    quote_size: Schema.Attribute.Enumeration<['normal', 'large', 'featured']> &
      Schema.Attribute.DefaultTo<'normal'>;
    quote_style: Schema.Attribute.Enumeration<
      ['default', 'highlighted', 'callout', 'testimonial']
    > &
      Schema.Attribute.DefaultTo<'default'>;
    quote_text: Schema.Attribute.Text & Schema.Attribute.Required;
    show_quote_marks: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<true>;
  };
}

export interface BlogModuleYoutube extends Struct.ComponentSchema {
  collectionName: 'components_blog_module_youtubes';
  info: {
    description: 'YouTube video embed with customization options';
    displayName: 'ModuleYoutube';
  };
  attributes: {
    aspect_ratio: Schema.Attribute.Enumeration<['16:9', '4:3', '1:1']> &
      Schema.Attribute.DefaultTo<'16:9'>;
    autoplay: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    custom_thumbnail: Schema.Attribute.Media<'images'>;
    player_size: Schema.Attribute.Enumeration<
      ['small', 'medium', 'large', 'full-width']
    > &
      Schema.Attribute.DefaultTo<'large'>;
    privacy_mode: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    show_controls: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    start_time: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
    video_description: Schema.Attribute.Text;
    video_id: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 20;
      }>;
    video_title: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 200;
      }>;
  };
}

export interface BlogTextModule extends Struct.ComponentSchema {
  collectionName: 'components_blog_text_modules';
  info: {
    description: 'Rich text content block with styling options';
    displayName: 'TextModule';
  };
  attributes: {
    background_style: Schema.Attribute.Enumeration<
      ['none', 'light', 'primary', 'accent']
    > &
      Schema.Attribute.DefaultTo<'none'>;
    content: Schema.Attribute.RichText & Schema.Attribute.Required;
    spacing: Schema.Attribute.Enumeration<['compact', 'normal', 'spacious']> &
      Schema.Attribute.DefaultTo<'normal'>;
    text_alignment: Schema.Attribute.Enumeration<
      ['left', 'center', 'right', 'justify']
    > &
      Schema.Attribute.DefaultTo<'left'>;
    text_size: Schema.Attribute.Enumeration<['small', 'normal', 'large']> &
      Schema.Attribute.DefaultTo<'normal'>;
  };
}

export interface EventAgendaItem extends Struct.ComponentSchema {
  collectionName: 'components_event_agenda_items';
  info: {
    description: 'Event agenda/schedule item';
    displayName: 'Agenda Item';
  };
  attributes: {
    description: Schema.Attribute.Text;
    duration_minutes: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 5;
        },
        number
      > &
      Schema.Attribute.DefaultTo<60>;
    location: Schema.Attribute.String;
    session_type: Schema.Attribute.Enumeration<
      [
        'keynote',
        'presentation',
        'workshop',
        'panel',
        'break',
        'networking',
        'q&a',
      ]
    > &
      Schema.Attribute.DefaultTo<'presentation'>;
    speaker_name: Schema.Attribute.String;
    time: Schema.Attribute.String & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface EventFaqItem extends Struct.ComponentSchema {
  collectionName: 'components_event_faq_items';
  info: {
    description: 'Individual FAQ question and answer';
    displayName: 'FAQ Item';
  };
  attributes: {
    answer: Schema.Attribute.RichText & Schema.Attribute.Required;
    question: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface EventFaqSection extends Struct.ComponentSchema {
  collectionName: 'components_event_faq_sections';
  info: {
    description: 'Frequently asked questions for events';
    displayName: 'FAQ Section';
  };
  attributes: {
    faqs: Schema.Attribute.Component<'event.faq-item', true>;
    title: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Frequently Asked Questions'>;
  };
}

export interface EventImageGallery extends Struct.ComponentSchema {
  collectionName: 'components_event_image_galleries';
  info: {
    description: 'Image gallery for events';
    displayName: 'Image Gallery';
  };
  attributes: {
    columns: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 6;
          min: 1;
        },
        number
      > &
      Schema.Attribute.DefaultTo<3>;
    images: Schema.Attribute.Media<'images', true> & Schema.Attribute.Required;
    layout: Schema.Attribute.Enumeration<['grid', 'carousel', 'masonry']> &
      Schema.Attribute.DefaultTo<'grid'>;
    title: Schema.Attribute.String;
  };
}

export interface EventLocation extends Struct.ComponentSchema {
  collectionName: 'components_event_locations';
  info: {
    description: 'Event location details';
    displayName: 'Location';
  };
  attributes: {
    address_line_1: Schema.Attribute.String & Schema.Attribute.Required;
    address_line_2: Schema.Attribute.String;
    city: Schema.Attribute.String & Schema.Attribute.Required;
    country: Schema.Attribute.String & Schema.Attribute.Required;
    directions: Schema.Attribute.Text;
    map_url: Schema.Attribute.String;
    parking_info: Schema.Attribute.Text;
    postal_code: Schema.Attribute.String;
    state_province: Schema.Attribute.String & Schema.Attribute.Required;
    venue_name: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface EventOrganizer extends Struct.ComponentSchema {
  collectionName: 'components_event_organizers';
  info: {
    description: 'Event organizer information';
    displayName: 'Organizer';
  };
  attributes: {
    bio: Schema.Attribute.Text;
    company: Schema.Attribute.String;
    email: Schema.Attribute.Email & Schema.Attribute.Required;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    phone: Schema.Attribute.String;
    photo: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String;
    website: Schema.Attribute.String;
  };
}

export interface EventPricingTier extends Struct.ComponentSchema {
  collectionName: 'components_event_pricing_tiers';
  info: {
    description: 'Event pricing tier/ticket type';
    displayName: 'Pricing Tier';
  };
  attributes: {
    availability: Schema.Attribute.Enumeration<
      ['available', 'sold-out', 'coming-soon', 'expired']
    > &
      Schema.Attribute.DefaultTo<'available'>;
    currency: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'USD'>;
    description: Schema.Attribute.Text;
    early_bird: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    features: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<[]>;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    price: Schema.Attribute.Decimal &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
    quantity_available: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
    sale_ends: Schema.Attribute.DateTime;
  };
}

export interface EventSpeaker extends Struct.ComponentSchema {
  collectionName: 'components_event_speakers';
  info: {
    description: 'Event speaker information';
    displayName: 'Speaker';
  };
  attributes: {
    bio: Schema.Attribute.Text & Schema.Attribute.Required;
    company: Schema.Attribute.String;
    linkedin_url: Schema.Attribute.String;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    photo: Schema.Attribute.Media<'images'>;
    session_description: Schema.Attribute.Text;
    session_title: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    twitter_url: Schema.Attribute.String;
    website: Schema.Attribute.String;
  };
}

export interface EventSponsor extends Struct.ComponentSchema {
  collectionName: 'components_event_sponsors';
  info: {
    description: 'Event sponsor information';
    displayName: 'Sponsor';
  };
  attributes: {
    description: Schema.Attribute.Text;
    logo: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    tier: Schema.Attribute.Enumeration<
      ['platinum', 'gold', 'silver', 'bronze', 'partner']
    > &
      Schema.Attribute.DefaultTo<'partner'>;
    website: Schema.Attribute.String;
  };
}

export interface EventSponsorSection extends Struct.ComponentSchema {
  collectionName: 'components_event_sponsor_sections';
  info: {
    description: 'Event sponsors showcase';
    displayName: 'Sponsor Section';
  };
  attributes: {
    sponsors: Schema.Attribute.Component<'event.sponsor', true>;
    title: Schema.Attribute.String & Schema.Attribute.DefaultTo<'Our Sponsors'>;
  };
}

export interface EventTextSection extends Struct.ComponentSchema {
  collectionName: 'components_event_text_sections';
  info: {
    description: 'Rich text content section for events';
    displayName: 'Text Section';
  };
  attributes: {
    background_style: Schema.Attribute.Enumeration<
      ['none', 'light', 'primary', 'accent']
    > &
      Schema.Attribute.DefaultTo<'none'>;
    content: Schema.Attribute.RichText & Schema.Attribute.Required;
    heading: Schema.Attribute.String;
    text_alignment: Schema.Attribute.Enumeration<
      ['left', 'center', 'right', 'justify']
    > &
      Schema.Attribute.DefaultTo<'left'>;
  };
}

export interface EventVideoSection extends Struct.ComponentSchema {
  collectionName: 'components_event_video_sections';
  info: {
    description: 'Video content for events';
    displayName: 'Video Section';
  };
  attributes: {
    autoplay: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    description: Schema.Attribute.Text;
    thumbnail: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String;
    video_type: Schema.Attribute.Enumeration<['youtube', 'vimeo', 'custom']> &
      Schema.Attribute.DefaultTo<'youtube'>;
    video_url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'blog.module-audio': BlogModuleAudio;
      'blog.module-image': BlogModuleImage;
      'blog.module-quote': BlogModuleQuote;
      'blog.module-youtube': BlogModuleYoutube;
      'blog.text-module': BlogTextModule;
      'event.agenda-item': EventAgendaItem;
      'event.faq-item': EventFaqItem;
      'event.faq-section': EventFaqSection;
      'event.image-gallery': EventImageGallery;
      'event.location': EventLocation;
      'event.organizer': EventOrganizer;
      'event.pricing-tier': EventPricingTier;
      'event.speaker': EventSpeaker;
      'event.sponsor': EventSponsor;
      'event.sponsor-section': EventSponsorSection;
      'event.text-section': EventTextSection;
      'event.video-section': EventVideoSection;
    }
  }
}
