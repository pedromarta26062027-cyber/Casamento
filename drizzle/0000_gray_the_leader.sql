CREATE TABLE `rsvps` (
	`id` text PRIMARY KEY NOT NULL,
	`contact_key` text NOT NULL,
	`full_name` text NOT NULL,
	`contact` text NOT NULL,
	`attending` integer NOT NULL,
	`total` integer NOT NULL,
	`companions` text DEFAULT '' NOT NULL,
	`children` text DEFAULT '' NOT NULL,
	`dietary` text DEFAULT '' NOT NULL,
	`rides` text DEFAULT '' NOT NULL,
	`message` text DEFAULT '' NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `rsvps_contact_key_unique` ON `rsvps` (`contact_key`);