<?php

namespace App\Notifications;

use Illuminate\Auth\Notifications\VerifyEmail;
use Illuminate\Notifications\Messages\MailMessage;

class CustomVerifyEmailNotification extends VerifyEmail
{
    public function __construct()
    {
    }

    public function via($notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param mixed $notifiable
     * @return MailMessage
     */
    public function toMail($notifiable): MailMessage
    {
        $prefix = 'http://localhost:5173/auth/verify-email?url=';
        $verificationUrl = $this->verificationUrl($notifiable);

        return (new MailMessage)
            ->line('The introduction to the notification.')
            ->action('Notification Action', $prefix . urlencode($verificationUrl))
            ->line('Thank you for using our application!');
    }

    public function toArray(object $notifiable): array
    {
        return [

        ];
    }
}
