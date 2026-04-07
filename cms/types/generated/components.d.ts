import type { Schema, Struct } from '@strapi/strapi';

export interface MissionMissionSection extends Struct.ComponentSchema {
  collectionName: 'components_mission_sections';
  info: {
    description: 'A single Seek/Shape/Send section with scripture refs';
    displayName: 'Mission Section';
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    body: Schema.Attribute.Text &
      Schema.Attribute.Required &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    heading: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    scriptures: Schema.Attribute.Component<'mission.scripture-ref', true>;
  };
}

export interface MissionScriptureRef extends Struct.ComponentSchema {
  collectionName: 'components_mission_scripture_refs';
  info: {
    description: 'Bible verse reference with link';
    displayName: 'Scripture Reference';
  };
  attributes: {
    reference: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String;
  };
}

export interface SharedAnnouncement extends Struct.ComponentSchema {
  collectionName: 'components_shared_announcements';
  info: {
    description: 'Homepage announcement banners';
    displayName: 'Announcement';
  };
  attributes: {
    active: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    backgroundColor: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'#1e3a5f'>;
    body: Schema.Attribute.Text;
    linkLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Learn More'>;
    linkUrl: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'mission.mission-section': MissionMissionSection;
      'mission.scripture-ref': MissionScriptureRef;
      'shared.announcement': SharedAnnouncement;
    }
  }
}
