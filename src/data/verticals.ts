import {
  Truck,
  Ship,
  Plane,
  Rocket,
  Radio,
  Shield,
  Bot,
  Crosshair,
  Gamepad2,
  Wrench,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface SubCategory {
  key: string;
}

export interface Vertical {
  key: string;
  slug: string;
  icon: LucideIcon;
  subcategories: SubCategory[];
}

export const verticals: Vertical[] = [
  {
    key: 'terrestrial',
    slug: 'vehicles-terrestres',
    icon: Truck,
    subcategories: [
      { key: 'armored_4x4' },
      { key: 'logistics_trucks' },
      { key: 'mine_vehicles' },
      { key: 'utv_atv' },
      { key: 'ugv_robots' },
      { key: 'ambulances' },
      { key: 'border_control' },
    ],
  },
  {
    key: 'naval',
    slug: 'sector-naval',
    icon: Ship,
    subcategories: [
      { key: 'intervention_vessels' },
      { key: 'advanced_navigation' },
      { key: 'offshore_patrol' },
      { key: 'light_submarines' },
      { key: 'surface_drones' },
      { key: 'semi_rigid' },
      { key: 'smart_mooring' },
    ],
  },
  {
    key: 'aeronautics',
    slug: 'aeronautica',
    icon: Plane,
    subcategories: [
      { key: 'light_aircraft' },
      { key: 'structural_components' },
      { key: 'flight_control' },
      { key: 'seats_oxygen' },
      { key: 'onboard_electronics' },
      { key: 'predictive_maintenance' },
    ],
  },
  {
    key: 'aerospace',
    slug: 'aeroespacial',
    icon: Rocket,
    subcategories: [
      { key: 'cubesats' },
      { key: 'deployable_antennas' },
      { key: 'electric_propulsion' },
      { key: 'carbon_fiber' },
      { key: 'ground_tracking' },
      { key: 'solar_modules' },
    ],
  },
  {
    key: 'c4isr',
    slug: 'comunicacions-c4isr',
    icon: Radio,
    subcategories: [
      { key: 'tactical_radios' },
      { key: 'command_consoles' },
      { key: 'satellite_terminals' },
      { key: 'light_radars' },
      { key: 'data_links' },
      { key: 'iff_systems' },
    ],
  },
  {
    key: 'cyber',
    slug: 'ciberdefensa',
    icon: Shield,
    subcategories: [
      { key: 'hardware_encryption' },
      { key: 'encrypted_comms' },
      { key: 'military_firewalls' },
      { key: 'intrusion_detection' },
      { key: 'forensic_analysis' },
      { key: 'advanced_auth' },
      { key: 'drone_security' },
    ],
  },
  {
    key: 'uav',
    slug: 'uav-robotica',
    icon: Bot,
    subcategories: [
      { key: 'aerial_drones' },
      { key: 'ground_robots' },
      { key: 'usv' },
      { key: 'uuv' },
      { key: 'robotic_arms' },
      { key: 'firefighting_robots' },
      { key: 'quadruped_robots' },
    ],
  },
  {
    key: 'armament',
    slug: 'armament-municio',
    icon: Crosshair,
    subcategories: [
      { key: 'precision_components' },
      { key: 'non_lethal_ammo' },
      { key: 'storage_systems' },
      { key: 'loaders_calibration' },
      { key: 'metal_parts' },
    ],
  },
  {
    key: 'simulation',
    slug: 'simulacio-gaming',
    icon: Gamepad2,
    subcategories: [
      { key: 'flight_simulators' },
      { key: 'vehicle_simulators' },
      { key: 'vr_ar_training' },
      { key: 'cybersecurity_training' },
      { key: 'digital_twins' },
      { key: 'tactical_simulators' },
      { key: 'graphics_engines' },
    ],
  },
  {
    key: 'auxiliary',
    slug: 'sector-auxiliar',
    icon: Wrench,
    subcategories: [
      { key: 'technical_textiles' },
      { key: 'anti_reflective_paints' },
      { key: 'ballistic_protection' },
      { key: 'tactical_footwear' },
      { key: 'ppe' },
      { key: 'modular_armor' },
      { key: 'cnc_machining' },
    ],
  },
];

export function getVerticalBySlug(slug: string): Vertical | undefined {
  return verticals.find((v) => v.slug === slug);
}

export function getAllVerticalSlugs(): string[] {
  return verticals.map((v) => v.slug);
}
