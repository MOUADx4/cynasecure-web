<?php

namespace App\Tests\Unit\Validator;

use App\Validator\StrongPassword;
use App\Validator\StrongPasswordValidator;
use PHPUnit\Framework\TestCase;
use Symfony\Component\Validator\Context\ExecutionContextInterface;

class StrongPasswordValidatorTest extends TestCase
{
    private ExecutionContextInterface $context;
    private StrongPasswordValidator $validator;

    protected function setUp(): void
    {
        $this->context = $this->createMock(ExecutionContextInterface::class);
        $this->validator = new StrongPasswordValidator();
        $this->validator->initialize($this->context);
    }

    public function test_valeur_null_ignoree(): void
    {
        $this->context->expects($this->never())->method('addViolation');
        $this->validator->validate(null, new StrongPassword());
    }

    public function test_valeur_vide_ignoree(): void
    {
        $this->context->expects($this->never())->method('addViolation');
        $this->validator->validate('', new StrongPassword());
    }

    public function test_mot_de_passe_valide_passe(): void
    {
        $this->context->expects($this->never())->method('addViolation');
        $this->validator->validate('Secure1!', new StrongPassword());
    }

    public function test_mot_de_passe_long_valide_passe(): void
    {
        $this->context->expects($this->never())->method('addViolation');
        $this->validator->validate('MonMotDePass3!TresLong', new StrongPassword());
    }

    public function test_trop_court_rejete(): void
    {
        $this->context->expects($this->once())
            ->method('addViolation')
            ->with($this->stringContains('8 caractères'));
        $this->validator->validate('Ab1!', new StrongPassword());
    }

    public function test_exactement_8_sans_special_rejete(): void
    {
        $this->context->expects($this->once())
            ->method('addViolation')
            ->with($this->stringContains('caractère spécial'));
        $this->validator->validate('Abcdef1a', new StrongPassword());
    }

    public function test_sans_majuscule_rejete(): void
    {
        $this->context->expects($this->once())
            ->method('addViolation')
            ->with($this->stringContains('majuscule'));
        $this->validator->validate('secure1!abc', new StrongPassword());
    }

    public function test_sans_minuscule_rejete(): void
    {
        $this->context->expects($this->once())
            ->method('addViolation')
            ->with($this->stringContains('minuscule'));
        $this->validator->validate('SECURE1!ABC', new StrongPassword());
    }

    public function test_sans_chiffre_rejete(): void
    {
        $this->context->expects($this->once())
            ->method('addViolation')
            ->with($this->stringContains('chiffre'));
        $this->validator->validate('SecureABC!', new StrongPassword());
    }

    public function test_sans_special_rejete(): void
    {
        $this->context->expects($this->once())
            ->method('addViolation')
            ->with($this->stringContains('caractère spécial'));
        $this->validator->validate('Secure1abc', new StrongPassword());
    }

    public function test_exactement_8_chars_valides_passe(): void
    {
        $this->context->expects($this->never())->method('addViolation');
        $this->validator->validate('Secure1!', new StrongPassword());
    }

    public function test_7_chars_avec_tous_types_rejete(): void
    {
        $this->context->expects($this->once())
            ->method('addViolation')
            ->with($this->stringContains('8 caractères'));
        $this->validator->validate('Sec1!Ab', new StrongPassword());
    }
}
