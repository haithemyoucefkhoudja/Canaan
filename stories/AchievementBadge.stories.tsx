// stories/AchievementBadge.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { AchievementBadge } from '../components/achievements/AchievementBadge'
import { Achievement } from '@prisma/client'

const meta: Meta<typeof AchievementBadge> = {
  title: 'Components/Achievements/AchievementBadge',
  component: AchievementBadge,
  tags: ['autodocs'],
  argTypes: {
    isUnlocked: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof AchievementBadge>

const mockAchievement: Achievement = {
    id: '1',
    name: 'First Win',
    description: 'Win your first game.',
    icon: '🏆',
    xp_bonus: 50,
    criteria: {},
    category: 'general',
    created_at: new Date(),
    updated_at: new Date(),
};

export const Unlocked: Story = {
  args: {
    achievement: mockAchievement,
    isUnlocked: true,
  },
}

export const Locked: Story = {
  args: {
    achievement: mockAchievement,
    isUnlocked: false,
  },
}