
// This is an autogenerated file from Firebase Studio.
"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, MessageSquareText, Send } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface UserReview {
  id: string;
  userName: string;
  rating: number;
  reviewText: string;
  reviewDate: string;
}

interface StarRatingInputProps {
  rating: number;
  setRating: (rating: number) => void;
  disabled?: boolean;
}

const StarRatingDisplay: React.FC<{ rating: number; className?: string }> = ({ rating, className }) => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(
      <Star
        key={i}
        className={`h-5 w-5 ${className} ${
          i < rating ? 'text-accent fill-accent' : 'text-muted-foreground/30' // Changed from text-yellow-400
        }`}
      />
    );
  }
  return <div className="flex items-center">{stars}</div>;
};

const StarRatingInput: React.FC<StarRatingInputProps> = ({ rating, setRating, disabled }) => {
  return (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-7 w-7 transition-colors ${
            disabled ? 'text-muted-foreground/30 cursor-not-allowed' : 'cursor-pointer hover:text-accent/80' // Adjusted hover
          } ${star <= rating ? 'text-accent fill-accent' : 'text-muted-foreground/30'}`} // Changed from text-yellow-400
          onClick={() => !disabled && setRating(star)}
          aria-label={`Calificar ${star} estrellas`}
        />
      ))}
    </div>
  );
};


export default function ReviewsPage() {
  const [reviews, setReviews] = useState<UserReview[]>([]);
  const [userName, setUserName] = useState('');
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim() || rating === 0 || !reviewText.trim()) {
      alert('Por favor, completa todos los campos y selecciona una calificación.');
      return;
    }
    const newReview: UserReview = {
      id: new Date().toISOString(), // Simple unique ID
      userName,
      rating,
      reviewText,
      reviewDate: new Date().toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
    };
    setReviews([newReview, ...reviews]); // Add new review to the beginning
    
    // Reset form
    setUserName('');
    setRating(0);
    setReviewText('');
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000); // Hide message after 3 seconds
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <header className="text-center mb-12">
        <div className="inline-flex items-center justify-center bg-primary/10 p-3 rounded-full mb-4">
          <MessageSquareText className="h-10 w-10 text-primary" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">
          Opiniones de la Comunidad
        </h1>
        <p className="mt-3 text-lg text-muted-foreground sm:mt-5 sm:text-xl">
          Lee lo que otros piensan o comparte tu propia experiencia con MTM.
        </p>
      </header>

      {/* Review Submission Form Card */}
      <Card className="mb-12 shadow-xl rounded-xl overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-500 ease-out">
        <CardHeader className="bg-muted/30 p-6">
          <CardTitle className="text-2xl font-semibold text-primary">Escribe tu Reseña</CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          {showSuccessMessage && (
            <div className="p-4 mb-4 text-sm text-primary bg-primary/10 rounded-lg" role="alert"> {/* Changed from green to primary based theme */}
              <span className="font-medium">¡Gracias!</span> Tu reseña ha sido enviada (simulado).
            </div>
          )}
          <form onSubmit={handleSubmitReview} className="space-y-4">
            <div>
              <Label htmlFor="userName" className="text-sm font-medium">Tu Nombre</Label>
              <Input
                id="userName"
                type="text"
                placeholder="Ej: Explorador@ Anónim@"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label className="text-sm font-medium mb-1 block">Tu Calificación</Label>
              <StarRatingInput rating={rating} setRating={setRating} />
            </div>
            <div>
              <Label htmlFor="reviewText" className="text-sm font-medium">Tu Reseña</Label>
              <Textarea
                id="reviewText"
                placeholder="Escribe aquí lo que piensas de MTM..."
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                required
                rows={4}
                className="mt-1"
              />
            </div>
            <Button type="submit" className="w-full sm:w-auto bg-primary hover:bg-primary/90">
              <Send className="mr-2 h-4 w-4" />
              Enviar Reseña
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Display Submitted Reviews */}
      <div className="space-y-8">
        {reviews.length === 0 ? (
          <div className="text-center py-10">
            <MessageSquareText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-xl text-muted-foreground">Aún no hay reseñas.</p>
            <p className="text-muted-foreground">¡Sé el primero en compartir tu opinión!</p>
          </div>
        ) : (
          reviews.map((review, index) => (
            <Card
              key={review.id}
              className="rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl animate-in fade-in slide-in-from-bottom-5 duration-500 ease-out"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader className="p-6 flex flex-row items-start gap-4">
                 <Avatar className="h-12 w-12 border">
                  <AvatarImage src={`https://placehold.co/100x100.png?text=${review.userName.substring(0,2)}`} alt={review.userName} data-ai-hint="user avatar" />
                  <AvatarFallback>{review.userName.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex-grow">
                  <CardTitle className="text-lg font-semibold">{review.userName}</CardTitle>
                  <StarRatingDisplay rating={review.rating} />
                </div>
                <p className="text-xs text-muted-foreground whitespace-nowrap">{review.reviewDate}</p>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <p className="text-sm text-muted-foreground italic">&quot;{review.reviewText}&quot;</p>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <div className="mt-16 text-center">
        <Button asChild variant="link">
          <Link href="/">Volver a la Página Principal</Link>
        </Button>
      </div>
    </div>
  );
}
