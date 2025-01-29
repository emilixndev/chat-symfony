<?php

namespace App\Controller;


use App\Repository\MessageRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;

class ChatController extends AbstractController
{

    public function __construct(private MessageRepository $messageRepository)
    {
    }

    #[Route('/messages/{idConversation}')]
    public function messages(string $idConversation): JsonResponse
    {

        return new JsonResponse($this->messageRepository->getMessagesFromConversation(intval($idConversation)));
    }

}